import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StreamValueCard, GroupCard } from "../../../components";
import { getStreams } from "../../../store/actions/serviceAction";

import EmptyStreamsSVG from "../../../assets/empty-streams.svg";
import "./style.scss";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import CardBoardLayout from "../../../components/layouts/card-board.layout";

function ManageStream(props) {
  const [streams, setStreams] = useState([
    { name: "test1", display_name: "Test User1", type: "stream" },
    { name: "test2", display_name: "Test User2", type: "stream" },
    { name: "test3", display_name: "Test User3", type: "stream" },
  ]);
  const [groups, setGroups] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    props.onGetStreams(props.match.params.id);
  }, []);

  useEffect(() => {
    const addType = (stream) => {
      stream.type = "stream";
      return stream;
    };

    if (props.streams) {
      const orgStreams = props.streams
        .filter((stream) => stream.share)
        .map(addType);
      const streams = props.streams
        .filter((stream) => !stream.share)
        .map(addType);
      setGroups([
        {
          id: 1,
          name: "Organisation streams",
          type: "group",
          childs: orgStreams,
        },
      ]);

      setStreams(streams);
    }
  }, [props.streams]);

  const createGroup = (name) => {
    let index = groups.length;
    groups.push({
      id: index + 1,
      name,
      type: "group",
      childs: [],
    });
    setGroups(groups);
    setVisibleModal(false);
  };

  return (
    props.streams && (
      <div className="wrapper">
        <h2 className="project-name">
          {streams.length > 0 && streams[0].project && streams[0].project.name}
        </h2>
        <h2 className="dashboard__header">Manage Streams</h2>
        <div className="rowContent">
          {
            <CardBoardLayout
              id="manage-stream-board"
              items={groups.concat(streams)}
            />
          }
        </div>
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
        <div className="dashboard__footer">
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
