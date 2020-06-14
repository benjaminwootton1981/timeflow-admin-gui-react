import React, { useState, useEffect } from "react";
import { StreamValueCard } from "../../../components";
import "./style.scss";
import { connect } from "react-redux";
import { getStreamProcessors } from "../../../store/actions/serviceAction";
import EmptyStreamProcessorSVG from "../../../assets/empty-streamprocessor.svg";

function ManageStreamProcessor(props) {
  const [streams, setStreams] = useState([
    { display_name: "Test User1" },
    { display_name: "Test User2" },
    { display_name: "Test User3" }
  ]);

  useEffect(() => {
    props.onGetStreamProcessors(props.match.params.id);
  }, []);

  useEffect(() => {
    setStreams(props.streams);
  }, [props.streams]);

  return (
    <div className="wrapper">
      <h2 className="project-name">Project: Customer Value Examination</h2>
      <h2 className="dashboard__header">Manage Stream Processors</h2>
      <div className="rowContent">
        {streams &&
          streams.length > 0 &&
          streams.map(item => (
            <StreamValueCard post={item} itemIdx={item.id} key={item.id} />
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
          <a
            className="btn create__group"
            href="#create-groupd-modal"
            id="create_ground"
            rel="modal:open"
          >
            <span>+ Create a Group</span>
          </a>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    streams: state.ServiceReducer.streamprocessors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetStreamProcessors: id => {
      dispatch(getStreamProcessors(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageStreamProcessor);
