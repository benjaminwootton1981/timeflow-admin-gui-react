import React, { Component } from "react";
import { connect } from "react-redux";
import { HighValueCard, OperationCard } from "../../components";
import "../global.scss";

class ManageStreamProcessor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mainContainer">
        <h6>Project: Customer Value Examination</h6>
        <h2>Manage Stream Processors</h2>
        <div className="rowContent">
          <HighValueCard />
          <HighValueCard />
          <HighValueCard />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageStreamProcessor);
