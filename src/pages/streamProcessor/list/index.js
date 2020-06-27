import React, { useEffect, useState } from "react";
import { StreamProcessorValueCard } from "../../../components";
import "./style.scss";
import { connect } from "react-redux";
import EmptyStreamProcessorSVG from "../../../assets/empty-streamprocessor.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { getStreamProcessorsList } from "../../../store/streamProcessor/action";
import api from "../../../api";
import { getMapped } from "../../stream/home";
import GroupView from "../../GroupView";
import Sortable from "../../Sortable";

function ManageStreamProcessor(props) {
  const [streamProcessors, setStreamProcessors] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const [allGroups, setAllGroups] = useState({
    base: [],
  });
  const [allItems, setAllItems] = useState([]);
  const [openGroup, setOpenGroup] = useState();

  const [project, setProject] = useState({});
  const projectId = props.match.params.id;

  useEffect(() => {
    props.getStreamProcessorsList(projectId);
  }, [projectId]);

  useEffect(() => {
    api.get(`projects/${projectId}`).then((response) => {
      setProject(response.data);
    });
  }, [projectId]);

  useEffect(() => {
    if (props.streamProcessors) {
      const streamProcessors = props.streamProcessors;

      const newState = {
        base: streamProcessors,
      };

      const mapped = getMapped(newState, "streamprocessors");
      setAllGroups(newState);
      setAllItems(mapped);
      setStreamProcessors(props.streamProcessors);
    }
  }, [props.streamProcessors]);

  useEffect(() => {
    const mapped = getMapped(allGroups, "streamprocessors");
    setAllItems(mapped);
  }, [allGroups]);

  const createGroup = (name) => {
    setAllGroups({ ...allGroups, [name]: [] });
    setVisibleModal(false);
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

  const isStreams = streamProcessors.length > 0;
  return (
    <div className="wrapper">
      <h2 className="project-name">{project.name}</h2>

      <h2 className="dashboard__header">Manage Stream Processors</h2>
      <Sortable
        allItems={allItems}
        setAllItems={setAllItems}
        allGroups={allGroups}
        setOpenGroup={setOpenGroup}
        type={"streamprocessors"}
        ItemComponent={StreamProcessorValueCard}
      />
      {!isStreams && (
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
      {
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
      }
      <CreateGroupModal
        show={visibleModal}
        closeModal={() => setVisibleModal(false)}
        createGroup={createGroup}
      />
    </div>
  );
}

export default connect(
  (state) => {
    return {
      streamProcessors: state.ServiceReducer.streamprocessors,
    };
  },
  { getStreamProcessorsList }
)(ManageStreamProcessor);
