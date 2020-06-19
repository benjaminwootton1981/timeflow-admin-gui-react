import React, { useState, useEffect } from "react";
import { GroupCard, StreamProcessorValueCard } from "../../../components";
import "./style.scss";
import { connect } from "react-redux";
import { getStreamProcessors } from "../../../store/actions/serviceAction";
import EmptyStreamProcessorSVG from "../../../assets/empty-streamprocessor.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import CardBoardLayout from "../../../components/layouts/card-board.layout";

function ManageStreamProcessor(props) {
  const [streams, setStreams] = useState();
  const [groups, setGroups] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    props.onGetStreamProcessors(props.match.params.id);
  }, []);

  useEffect(() => {
      setStreams(props.streams && props.streams.map(stream => {
          stream.type = "streamprocessor";
          return stream;
      }));
  }, [props.streams]);

  const createGroup = (name) => {
      let index = groups.length;
      groups.push({
          id: index + 1,
          name,
          type: 'group',
          childs: []
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
            {
                <CardBoardLayout id="manage-stream-processor-board" items={groups.concat(streams)} />
            }
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
