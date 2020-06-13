import React, { Component } from "react";
import { connect } from "react-redux";

class StepCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="stepCard">
        <i className="fa fa-upload fa-3x purple padding-10"></i>
        <div>
          <p className="purple">Simple Filter Step</p>
          <p>Description for simle filter step card</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(StepCard);
