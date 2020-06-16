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
  const [polio, setPolio] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValues, setInputValues] = useState({
    processorName: "Customer Value Examination",
    processorNum: 1,
    processorDesc: ""
  });

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const togglePolio = () => {
    setPolio(!polio);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addNewStep = () => {};

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
          className="step"
          style={{ width: "48%", marginLeft: "1%" }}
          value={inputValues.processorDesc}
          onChange={handleChange}
        />
      </div>
      <div className="marginTop-20 streamProcessorCardContainer">
        <div className="new-item__body">
          <table className="new-item__step" id="steps-table">
            <tbody>
              <tr>
                <th>Step Name</th>
                <th>Step Type</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>
                  <input
                    name="name_new_0"
                    value="Inbound Event"
                    className="required"
                  />
                </td>
                <td>
                  <div className="styled-select">
                    <select
                      name="steptype_new_0"
                      className="step"
                      data-step_id="new_0"
                      onchange="stepTypeChanged(this)"
                    >
                      <option value="{{ step_type }}">
                        Inbound Event - Stream
                      </option>
                    </select>
                  </div>
                  <div className="add-selects" data-step_id="new_0">
                    <div className="styled-select">
                      <select
                        name="{{ item.name }}_new_0"
                        className="form-control step"
                        data-step_id="new_0"
                        data-popover-body="{{ item.popover.bottom_text }}"
                        data-popover-title="{{ item.popover.top_text }}"
                      >
                        <option value="0">Please Select...</option>
                        <option value="{{ topic.name }}">
                          topic.display_name
                        </option>
                        {/* <option value="{{ option.0 }}">{{ option.1 }}</option> */}
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="hidden"
                    name="ordering_new_0"
                    value="1"
                    className="ordering_new"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="schema-additional-info">
            <button className="schema-btn" onClick={togglePolio}>
              Please Select...
            </button>

            <div
              className="schema-popup"
              style={{ display: polio ? "block" : "none" }}
            >
              <div className="schema-popup-wrapper">
                <div className="schema-popup-content">
                  <table className="schema-table">
                    <thead>
                      <tr>
                        <th>Field Name</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <table className="new-item__step" id="steps-table">
            <tbody>
              <tr>
                <th>Step Name</th>
                <th>Step Type</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td>
                  <input
                    name="name_new_1"
                    value="Outbound Event"
                    className="required"
                  />
                </td>
                <td>
                  <div className="styled-select">
                    <select
                      name="steptype_new_1"
                      className="step"
                      data-step_id="new_1"
                      onchange="stepTypeChanged(this)"
                    >
                      <option value="{{ step_type.0 }}">step_type.1</option>
                    </select>
                  </div>
                  <div className="add-selects" data-step_id="new_1">
                    <div className="styled-select">
                      <select
                        name="{{ item.name }}_new_1"
                        className="form-control step"
                        data-step_id="new_1"
                        data-popover-body="{{ item.popover.bottom_text }}"
                        data-popover-title="{{ item.popover.top_text }}"
                      >
                        <option value="0">Please Select...</option>
                        <option value="1">display_name</option>
                      </select>
                    </div>
                  </div>
                </td>
                <td>
                  <input
                    type="hidden"
                    name="ordering_new_1"
                    value="2"
                    className="ordering_new"
                  />
                  <button className="card-btn card-btn--delete js-delete">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <StreamProcessorCard /> */}
      </div>
      <div className="bottom-left">
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
        <Modal.Body className="row add-modal-body">
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
          <NewStepCard title="TBC" description="TBC"/>
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
