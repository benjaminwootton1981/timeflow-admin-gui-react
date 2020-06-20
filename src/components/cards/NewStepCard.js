import React from "react";
import { connect } from "react-redux";

const NewStepCard = (props) => {
  const { step } = props;
  return (
    <div className={`newStepCard ${props.selected}`}>
      {/* <i className="fa fa-upload fa-3x purple padding-10"></i> */}
      <div className="icon--addstep"></div>
      <div style={{ width: "70%" }}>
        <span className="addstep-label">{step.name}</span>
        <p className="addstep-desc">Description for simle filter step card</p>
      </div>
    </div>
  );
};

export default connect((state) => {
  return {};
}, {})(NewStepCard);
