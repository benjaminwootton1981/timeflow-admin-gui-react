import React, { Component } from "react";
import { connect } from "react-redux";
import ReplicaInfo from "../managestream/ReplicaInfo";

class SimulationValueCard extends Component {
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
          type={"simulation"}
        />
        <div className="cardFooter">
          <a
            href={`/projects/${item.project && item.project.id}/simulations/${
              item.id
            }/edit/`}
            className="edit"
          >
            <span className="helper">Edit</span>
          </a>
          <a
            href={`/projects/${item.project && item.project.id}/simulations/${
              item.id
            }/duplicate/`}
            className="duplicate"
          >
            <span className="helper">Duplicate</span>
          </a>
          <a
            href={`/projects/${item.project && item.project.id}/simulations/${
              item.id
            }/run/`}
            className="deploy"
          >
            <span className="helper">Deploy</span>
          </a>
          <a
            href={`/projects/${item.project && item.project.id}/simulations/${
              item.id
            }/stop/`}
            className="pause"
          >
            <span className="helper">Stop</span>
          </a>
          <a
            href={`/projects/${item.project && item.project.id}/simulations/${
              item.id
            }/delete/`}
            className="delete"
          >
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
)(SimulationValueCard);
