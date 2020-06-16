import React, { Component } from "react";
import { connect } from "react-redux";
import ReplicaInfo from "../managestream/ReplicaInfo";

class StreamProcessorValueCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.post;
    return (
      <div className="Valuecard">
        <h2 className="valueHeader">{item.name}</h2>
        <ReplicaInfo
          eventId={item.id}
          projectId={item.project && item.project.id}
          userId={item.owning_user && item.owning_user.id}
          requestedReplicas={item.replicas}
          eventType={"streamprocessor"}
        />
        <div className="cardFooter">
          <a
            href={`/projects/${
              item.project && item.project.id
            }/streamprocessors/${item.id}/edit/`}
            className="edit"
          >
            {/*EDIT - Needs to go to - /projects/2/streamprocessors/3/edit/ -->*/}
            <span className="helper">Edit</span>
          </a>
          <a
            href={`/projects/${
              item.project && item.project.id
            }/streamprocessors/${item.id}/duplicate/`}
            className="duplicate"
          >
            {/*DUPLICATE -  Needs to go to - /projects/2/streamprocessors/3/duplicate/-->*/}
            <span className="helper">Duplicate</span>
          </a>
          <a
            href={`/projects/${
              item.project && item.project && item.project.id
            }/streamprocessors/${item.id}/run/`}
            className="deploy"
          >
            {/*DEPLOY - Needs to go to - /projects/2/streamprocessors/3/run/ -->*/}
            <span className="helper">Deploy</span>
          </a>
          <a
            href={`/projects/${
              item.project && item.project.id
            }/streamprocessors/${item.id}/stop/`}
            className="pause"
          >
            {/*STOP - Needs to go to - /projects/2/streamprocessors/3/stop/ -->*/}
            <span className="helper">Stop</span>
          </a>
          <a
            href={`/projects/${
              item.project && item.project.id
            }/streamprocessors/${item.id}/monitor/`}
            className="monitor"
          >
            {/*MONITOR - Needs to go to - /projects/2/streamprocessors/3/monitor/ -->*/}
            <span className="helper">Monitor</span>
          </a>
          <a
            href={`/projects/${
              item.project && item.project.id
            }/streamprocessors/${item.id}/delete/`}
            className="delete"
          >
            {/*DELETE  Needs to go to - /projects/2/streamprocessors/3/delete/ -->*/}
            <span className="helper">Delete</span>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamProcessorValueCard);
