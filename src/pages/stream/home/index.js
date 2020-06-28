import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StreamValueCard } from "../../../components";
import { getStreams } from "../../../store/actions/serviceAction";

import EmptyStreamsSVG from "../../../assets/empty-streams.svg";
import "./style.scss";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import { omit } from "lodash";
import GroupView from "../../GroupView";
import Sortable from "../../Sortable";
import api from "../../../api";

export const getMapped = (allGroups, type) => {
  const groups = Object.keys(omit(allGroups, "base"));
  const mapped = [];
  allGroups.base.concat(groups).forEach((value, index) => {
    mapped.push({
      id: value.id || value,
      value,
      [type]: allGroups[value]?.map((value, index) => ({
        id: value.id,
        value,
      })),
    });
  });

  return mapped;
};

function ManageStream(props) {
  const [streams, setStreams] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [allGroups, setAllGroups] = useState({
    base: [],
  });

  const [allItems, setAllItems] = useState([]);
  const [openGroup, setOpenGroup] = useState();

  const [project, setProject] = useState({});
  const projectId = props.match.params.id;

  useEffect(() => {
    props.onGetStreams(projectId);
  }, [projectId]);

  useEffect(() => {
    api.get(`projects/${projectId}`).then((response) => {
      setProject(response.data);
    });
  }, [projectId]);

  useEffect(() => {
    if (props.streams) {
      const orgStreams = props.streams.filter((stream) => stream.share);

      const streams = props.streams.filter((stream) => !stream.share);

      const newState = {
        base: streams,
      };

      if (orgStreams.length) {
        newState["Organisation Shared Streams"] = orgStreams;
      }

      const mapped = getMapped(newState, "streams");
      setAllGroups(newState);
      setAllItems(mapped);
      setStreams(streams);
    }
  }, [props.streams]);

  useEffect(() => {
    const mapped = getMapped(allGroups, "streams");
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
        items={openGroup.streams}
        setOpenGroup={setOpenGroup}
        ItemComponent={StreamValueCard}
      />
    );
  }

  return (
    props.streams && (
      <div className="wrapper">
        <h2 className="project-name">{project.name}</h2>
        <h2 className="dashboard__header">Manage Streams</h2>
        <Sortable
          allItems={allItems}
          setAllItems={setAllItems}
          allGroups={allGroups}
          setOpenGroup={setOpenGroup}
          type={"streams"}
          ItemComponent={StreamValueCard}
        />
        {props.streams.length === 0 && (
          <div className="empty">
            <span className="empty__text">No streams are available.</span>
            <img
              src={EmptyStreamsSVG}
              width="155"
              height="134"
              alt="no data"
              className="empty__image"
            />
          </div>
        )}
        <div
          className="dashboard__footer"
          style={{ borderTop: props.streams.length === 0 ? "none" : undefined }}
        >
          <a
            className="btn"
            href={`/projects/${props.match.params.id}/streams/new`}
          >
            Add Stream
          </a>
          {streams.length !== 0 && (
            <button
              className="btn create__group"
              onClick={() => setVisibleModal(true)}
            >
              <span>+ Create a Group</span>
            </button>
          )}
        </div>
        <CreateGroupModal
          show={visibleModal}
          closeModal={() => setVisibleModal(false)}
          createGroup={createGroup}
        />
      </div>
    )
  );
}

const mapStateToProps = (state) => {
  return {
    streams: state.ServiceReducer.streams,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStreams: (id) => {
      dispatch(getStreams(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStream);
