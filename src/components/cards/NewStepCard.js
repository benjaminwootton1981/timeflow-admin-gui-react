import React from "react";
import { connect } from "react-redux";
import logo from "../../assets/add-step-icon.svg";

const NewStepCard = (props) => {
  const { step } = props;
  return (
    <div className={`newStepCard ${props.selected}`}>
      <img className="iocnAddNewStep" alt={"img"} src={logo} />
      <div className="textBlockNewStepModal">
        <span className="addstep-label">{step.name}</span>
        <span className="addstep-desc">{step.description}</span>
      </div>
    </div>
  );
};

export default connect((state) => {
  return {};
}, {})(NewStepCard);
