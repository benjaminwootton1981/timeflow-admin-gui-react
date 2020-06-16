import React, { useState, useEffect } from "react";
import { GroupCard, StreamProcessorValueCard } from "../../../components";
import "./style.scss";
import { connect } from "react-redux";
import { getStreamProcessors } from "../../../store/actions/serviceAction";
import EmptyStreamProcessorSVG from "../../../assets/empty-streamprocessor.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";

function ManageStreamProcessor(props) {
  const [streams, setStreams] = useState();
  const [groups, setGroups] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    props.onGetStreamProcessors(props.match.params.id);
  }, []);

  useEffect(() => {
    setStreams(props.streams);
  }, [props.streams]);

  const createGroup = (name) => {
    groups.push({
      name,
    });
    setGroups(groups);
    setVisibleModal(false);
  };

  if (!streams) {
    return (
      <div className="dashboard__footer">
        <a
          className="btn"
          href={`/react/projects/${props.match.params.id}/streamprocessors/new`}
        >
          Add Stream Processor
        </a>
      </div>
    );
  }

  return (
    streams && (
      <div className="wrapper">
        <h2 className="project-name">
          {streams.length > 0 && streams[0].project && streams[0].project.name}
        </h2>
        <h2 className="dashboard__header">Manage Stream Processors</h2>
        <div className="rowContent">
          {groups.map((group, index) => (
            <GroupCard key={`group-${index}`} item={group} />
          ))}
          {streams &&
            streams.length > 0 &&
            streams.map((item) => (
              <StreamProcessorValueCard
                post={item}
                itemIdx={item.id}
                key={item.id}
              />
            ))}
        </div>
        {streams.length === 0 && (
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
        <div className="dashboard__footer">
          <a
            className="btn"
            href={`/react/projects/${props.match.params.id}/streamprocessors/new`}
          >
            Add Stream Processor
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
    streams: state.ServiceReducer.streamprocessors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetStreamProcessors: (id) => {
      dispatch(getStreamProcessors(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageStreamProcessor);
