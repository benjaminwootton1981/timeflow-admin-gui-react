import React, { useState } from "react";
import "./style.scss";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import { TabPanel } from "../../../components/common";
import { Modal } from "react-bootstrap";
import { StepCard } from "../../../components";
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

export default function MonitorStreamProcessor() {
  const [tab, setTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="wrapper">
      <h2 className="dashboard__header">New Stream Processor</h2>
      <div className="bottom-left">
        <a
          className="btn btn-outline"
          href="#create-groupd-modal"
          id="new_step"
          rel="modal:open"
        >
          <span>+ New step</span>
        </a>
        <button
          className="btn btn-outline marginLeft-20"
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
        backdrop="static"
        onHide={hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Add A New Step</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row">
          <StepCard />
          <StepCard />
          <StepCard />
          <StepCard />
          <StepCard />
          <StepCard />
          <StepCard />
          <StepCard />
          <StepCard />
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
