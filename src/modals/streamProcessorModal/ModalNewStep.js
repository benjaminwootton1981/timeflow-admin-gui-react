import React, { useState } from "react";
import "./style.scss";
import { Modal } from "react-bootstrap";
import { NewStepCard } from "../../components";
import { connect } from "react-redux";
import { addStep } from "../../store/streamProcessor/action";
import { Button } from "../../components/buttons/Buttons";

const ModalNewStep = (props) => {
  const [selectedStepType, setSelectedStepType] = useState("");
  const [selectedStep, setSelectedStep] = useState(false);
  const { stepData } = props.itemStreamProcessor;
  const { step_types } = stepData;
  const addStep = (type) => {
    if (selectedStepType !== "") {
      props.addStep(type);
      props.hideModal();
      setSelectedStepType("");
    } else {
      alert("please select a step type ");
    }
  };
  const selectStep = (stepData, index) => {
    setSelectedStepType(stepData);
    setSelectedStep(index);
    props.updateDataStep();
  };

  const filteredStepTypes = step_types.filter(
    (el) =>
      el.name.split(" ")[0] !== "Inbound" &&
      el.name.split(" ")[0] !== "Outbound"
  );

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      show={props.isModalVisible}
      onHide={props.hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Add A New Step</Modal.Title>
      </Modal.Header>
      <div className="bodyStepType">
        {filteredStepTypes.map((step, index) => {
          const stepData = { value: step.value, name: "steptype" };
          const selected = selectedStep === index ? "selected" : "";
          return (
            <div
              className={`step_type`}
              onClick={() => selectStep(stepData, index)}
            >
              <NewStepCard step={step} selected={selected} />
            </div>
          );
        })}
      </div>
      <Modal.Footer>
        <div
          onClick={() => addStep(selectedStepType)}
          style={{ width: "100%" }}
          className="horizontalCenter"
        >
          <Button text={"Add"} color={"dark"} />
        </div>
      </Modal.Footer>
    </Modal>
  );
};
export default connect(
  (state) => {
    return {
      itemStreamProcessor: state.StreamProcessorReducer,
    };
  },
  { addStep }
)(ModalNewStep);
