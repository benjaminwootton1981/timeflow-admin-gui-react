import React, { Component } from "react";
import { connect } from "react-redux";

class NewStepCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="newStepCard">
        {/* <i className="fa fa-upload fa-3x purple padding-10"></i> */}
        <div className="icon--addstep"></div>
        <div>
          <span className="addstep-label">Simple Filter Step</span>
          <p className="addstep-desc">Description for simle filter step card</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewStepCard);
