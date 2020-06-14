import React, { useState } from "react";
import "./style.scss";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import { TabPanel } from "../../../components/common";
import { Modal } from "react-bootstrap";
import { NewStepCard, StreamProcessorCard } from "../../../components";
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

export default function MonitorStreamProcessor() {
  const [tab, setTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    processorName: "",
    processorNum: 1,
    processorDesc: ""
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div className="wrapper">
      <h2 className="dashboard__header">New Stream Processor</h2>
      <div className="row">
        <div style={{ width: "50%" }}>
          <input
            type="text"
            name="processorName"
            placeholder="Stream Processor Name"
            value={inputValues.processorName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="processorNum"
            style={{ marginTop: "1%" }}
            value={inputValues.processorNum}
            onChange={handleChange}
          />
        </div>
        <textarea
          type="text"
          name="processorDesc"
          placeholder="Stream Processor Description"
          style={{ width: "48%", marginLeft: "1%" }}
          value={inputValues.processorDesc}
          onChange={handleChange}
        />
      </div>
      <div className="marginTop-20">
        <StreamProcessorCard />
      </div>
      <div className="bottom-left">
        {/* <a
          className="btn btn-outline"
          href="#create-groupd-modal"
          id="new_step"
          rel="modal:open"
        >
          <span>+ New step</span>
        </a> */}
        <button
          className="btn btn-outline marginLeft-20 marginTop-20"
          href="#"
          id="add_new_step"
          rel="modal:open"
          onClick={toggleModal}
        >
          <span>+ Add New Step</span>
        </button>
      </div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        show={isModalVisible}
        onHide={hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Add A New Step</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <NewStepCard />
          <NewStepCard />
          <NewStepCard />
          <NewStepCard />
          <NewStepCard />
          <NewStepCard />
          <NewStepCard />
          <NewStepCard />
          <NewStepCard />
        </Modal.Body>
        <Modal.Footer>
          <a
            className="btn"
            href="#create-groupd-modal"
            id="new_step"
            rel="modal:open"
          >
            <span>Add</span>
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
