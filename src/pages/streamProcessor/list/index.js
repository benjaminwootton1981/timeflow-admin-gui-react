import React, { useState, useEffect } from "react";
import { GroupCard, StreamProcessorValueCard } from "../../../components";
import "./style.scss";
import { connect } from "react-redux";
import EmptyStreamProcessorSVG from "../../../assets/empty-streamprocessor.svg";
import CreateGroupModal from "../../../modals/CreateGroupModal";
import CardBoardLayout from "../../../components/layouts/card-board.layout";
import { getStreamProcessors } from "../../../store/actions/serviceAction";

function ManageStreamProcessor(props) {
  const [streams, setStreams] = useState(props.streams.streamprocessors);
  const [groups, setGroups] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  useEffect(() => {
    props.getStreamProcessors(props.match.params.id);
    // props.getStreamProcessors(1);
  }, []);

  useEffect(() => {}, [props.streams.streamprocessors]);

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

  if (!props.streams.streamprocessors) {
    return false;
  }

  const isStreams = props.streams.streamprocessors.length > 0;
  return (
    <div className="wrapper">
      {/*<h2 className="project-name">*/}
      {/*    {streams.length > 0 && streams[0].project && streams[0].project.name}*/}
      {/*</h2>*/}

      {/*<h2 className="dashboard__header">Manage Stream Processors</h2>*/}

      <div className="rowContent">
        {/*{groups.map((group, index) => (*/}
        {/*    <GroupCard key={`group-${index}`} item={group}/>*/}
        {/*))}*/}
        {props.streams.streamprocessors.map((item) => (
          <div style={{ margin: 20 }}>
            <StreamProcessorValueCard
              post={item}
              itemIdx={item.id}
              key={item.id}
            />
          </div>
        ))}

        {
          <CardBoardLayout
            id="manage-stream-processor-board"
            items={groups.concat(streams)}
          />
        }
      </div>
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
        <div className="dashboard__footer">
          <a
            className="btn"
            href={`/react/projects/${props.match.params.id}/streamprocessors/new`}
          >
            Add Stream Processor
          </a>
          {
            <button
              className="btn create__group"
              onClick={() => setVisibleModal(true)}
            >
              <span>+ Create a Group</span>
            </button>
          }
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
      streams: state.ServiceReducer,
    };
  },
  { getStreamProcessors }
)(ManageStreamProcessor);
