import React, { useState, useEffect } from "react";
import { HighValueCard } from "../../../components";
import './style.scss';
import {connect} from "react-redux";
import {getStreams} from "../../../store/actions/serviceAction";

function ManageStreamProcessor(props) {

  const [streams, setStreams] = useState([
      {display_name: "Test User1"},
      {display_name: "Test User2"},
      {display_name: "Test User3"},
  ]);

  useEffect(() => {
      props.onGetStream(props.match.params.id);
  }, [])

  useEffect(() => {
      setStreams(props.streams)
  }, [props.streams])

    return (
        <div className="wrapper">
            <h2 className="project-name">Project: Customer Value Examination</h2>
            <h2 className="dashboard__header">Manage Stream Processors</h2>
            <div className="rowContent">
                {streams &&
                streams.length > 0 &&
                streams.map(item => (
                    <HighValueCard post={item} itemIdx={item.id} key={item.id} />
                ))}
            </div>
            <div className="dashboard__footer">
                <a className="btn" href={`/projects/${props.match.params.id}/streamprocessors`}>
                    Add Stream Processor
                </a>
                <a className="btn create__group" href="#create-groupd-modal" id="create_ground" rel="modal:open">
                    <span>+ Create a Group</span>
                </a>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        streams: state.ServiceReducer.streams
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetStream: (id) => {
            dispatch(getStreams(id));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageStreamProcessor);
