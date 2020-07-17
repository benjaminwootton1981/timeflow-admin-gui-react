import React from "react";
import { connect } from "react-redux";
import logo from "../../assets/add-step-icon.svg";

const NewStepCard = (props) => {
  const { step } = props;
  return (
    <div className={`newStepCard ${props.selected}`}>
      <img style={{ width: "15%", height: "15%" }} alt={"img"} src={logo} />
      <div
        style={{
          width: "70%",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          paddingLeft: 10,
        }}
      >
        <span className="addstep-label">{step.name}</span>
        <span className="addstep-desc">{step.description}</span>
      </div>
    </div>
  );
};

export default connect((state) => {
  return {};
}, {})(NewStepCard);
