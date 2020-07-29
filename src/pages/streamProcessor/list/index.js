import React, { useEffect, useState } from "react";
import { StreamProcessorValueCard } from "../../../components";
import "./style.scss";
import { connect } from "react-redux";
import EmptyStreamProcessorSVG from "../../../assets/empty-streamprocessor.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { getStreamProcessorsList } from "../../../store/streamProcessor/action";
import api from "../../../api";
import { getId, getItems, getMapped } from "../../stream/home";
import GroupView from "../../GroupView";
import Sortable from "../../Sortable";
import { keyBy } from "lodash";
import { message } from "antd";
import { getProjects } from "../../../store/actions/serviceAction";
import CircularProgress from "@material-ui/core/CircularProgress";

function ManageStreamProcessor(props) {
  const [streamProcessors, setStreamProcessors] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const [allGroups, setAllGroups] = useState({
    base: [],
  });
  const [allItems, setAllItems] = useState([]);
  const [openGroup, setOpenGroup] = useState();

  const [groups, setGroups] = useState({});
  const projectId = props.match.params.id;
  const { project } = props;

  useEffect(() => {
    props.getStreamProcessorsList(projectId);
  }, [projectId]);
  useEffect(() => {
    props.getStreamProcessorsList(projectId);
  }, []);

  useEffect(() => {
    props.getProjects(projectId);
  }, [projectId, streamProcessors]);
  useEffect(() => {
    if (props.streamProcessorsProps) {
      const streamProcessorsFiltered = props.streamProcessorsProps.filter(
        (streamProcessor) => !streamProcessor.group
      );

      const newState = {
        base: streamProcessorsFiltered,
      };

      const mapped = getMapped(newState, "streamprocessors");
      setAllGroups((state) => ({ ...state, ...newState }));
      setAllItems(mapped);
      setStreamProcessors(streamProcessorsFiltered);
    }
  }, [props.streamProcessorsProps]);

  useEffect(() => {
    api
      .get("streamprocessor_groups", {
        params: {
          project: projectId,
        },
      })
      .then((response) => {
        const groups = response.data;
        const groupMap = {};

        groups.forEach((group) => {
          groupMap[group.name] = group.streamprocessors;
        });
        setAllGroups((state) => ({
          ...state,
          ...groupMap,
        }));
        setGroups(keyBy(groups, "name"));
      });
  }, []);

  useEffect(() => {
    const mapped = getMapped(allGroups, "streamprocessors");
    setAllItems(mapped);
  }, [allGroups]);
  const createGroup = (name) => {
    api
      .post("streamprocessor_groups/", {
        name: name,
        project: projectId,
      })
      .then((response) => {
        setGroups({ ...groups, [name]: response.data });
        setAllGroups({ ...allGroups, [name]: [] });
        setVisibleModal(false);
      })
      .catch((e) => {
        const data = e.response?.data;

        if (data) {
          message.error(data[0]);
        }
      });
  };

  const onDragEnd = (streamprocessorId, sourceId, destinationId, newIndex) => {
    if (!streamprocessorId.includes("`streamprocessor`")) {
      return;
    }
    const reorderedStreamProcessors = getItems(
      allItems,
      "streamprocessors",
      null
    );

    api
      .post(`streamprocessors/reorder/`, {
        id: getId(streamprocessorId),
        group: !getId(destinationId) ? null : getId(destinationId),
        sort_order: newIndex,
        items: reorderedStreamProcessors,
      })
      .then((response) => console.log(response.data));
  };

  if (openGroup) {
    return (
      <GroupView
        name={openGroup.name}
        items={openGroup.streamprocessors}
        setOpenGroup={setOpenGroup}
        ItemComponent={StreamProcessorValueCard}
      />
    );
  }

  const isStreams = allItems.length > 0;

  return (
    <div className="wrapper">
      <h2 className="project-name">{project.name}</h2>

      <h2 className="dashboard__header">Manage Stream Processors</h2>
      {!props.loader.loading && (
        <Sortable
          allItems={allItems}
          setAllItems={setAllItems}
          allGroups={groups}
          setOpenGroup={setOpenGroup}
          type={"streamprocessors"}
          ItemComponent={StreamProcessorValueCard}
          onDragEnd={onDragEnd}
        />
      )}

      {!isStreams && !props.loader.loading && (
        <div className="empty">
          <span className="empty__text">
            No stream processors are available.
          </span>
          <img
            src={EmptyStreamProcessorSVG}
            width="155"
            height="134"
            alt="no data"
            className="empty__image"
          />
        </div>
      )}
      {props.loader.loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <CircularProgress color="#803c8a" />
        </div>
      )}
      {!props.loader.loading && (
        <div
          className="dashboard__footer"
          style={{ borderTop: !isStreams ? "none" : undefined }}
        >
          <a
            className="btn"
            href={`/react/projects/${props.match.params.id}/streamprocessors/new`}
          >
            Add Stream Processor
          </a>
          {isStreams && (
            <button
              className="btn create__group"
              onClick={() => setVisibleModal(true)}
            >
              <span>+ Create a Group</span>
            </button>
          )}
        </div>
      )}
      {!props.loader.loading && (
        <CreateGroupModal
          show={visibleModal}
          closeModal={() => setVisibleModal(false)}
          createGroup={createGroup}
        />
      )}
    </div>
  );
}

export default connect(
  (state) => {
    return {
      streamProcessorsProps: state.ServiceReducer.streamprocessors,
      project: state.ServiceReducer.projects,
      loader: state.loader,
    };
  },
  {
    getStreamProcessorsList,
    getProjects,
  }
)(ManageStreamProcessor);
