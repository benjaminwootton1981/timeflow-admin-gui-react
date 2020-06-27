import React, { Component } from "react";
import ReplicaInfo from "../managestream/ReplicaInfo";
import api from "../../api";
import { notification } from "antd";
import DragIcon from "../../assets/drag-icon.svg";

const SimulationValueCard = ({ post: item, isDragging }) => {
  const handleAction = (action) => {
    return api.post(`simulation_action/${action}`, {
      project_id: item.project && item.project.id,
      simulation_id: item.id,
    });
  };
  const handleRun = () => {
    handleAction("run").then((response) => {
      const status = response.data.status;

      if (status === "failed") {
        notification.error({
          message: response.data.reason || "Simulation deployment failed.",
        });
      }
    });
  };

  const handleStop = () => {
    handleAction("stop").then((response) => {
      const status = response.data.status;

      if (status === "success") {
        notification.success({
          message: "Simulation Stopped",
        });
      }

      if (status === "failed") {
        notification.error({
          message: response.data.reason || "Simulation Stop failed, try again.",
        });
      }
    });
  };

  return (
    <div className="Valuecard">
      <h2 className="valueHeader handle">{item.name}</h2>
      <div className="cardBody">
        {isDragging && (
          <div className="stream__dragging">
            <img src={DragIcon} alt="" />
          </div>
        )}
        <ReplicaInfo
          eventId={item.id}
          projectId={item.project && item.project.id}
          userId={item.created_by && item.created_by.id}
          requestedReplicas={item.replicas}
          eventType={"simulation"}
        />
      </div>
      <div className="cardFooter">
        <a
          href={`/projects/${item.project && item.project.id}/simulations/${
            item.id
          }/edit/`}
          className="edit"
        >
          <span className="helper">Edit</span>
        </a>
        <a
          href={`/projects/${item.project && item.project.id}/simulations/${
            item.id
          }/duplicate/`}
          className="duplicate"
        >
          <span className="helper">Duplicate</span>
        </a>
        <button onClick={handleRun} className="deploy">
          <span className="helper">Deploy</span>
        </button>
        <button className="pause" onClick={handleStop}>
          <span className="helper">Stop</span>
        </button>
        <a
          href={`/projects/${item.project && item.project.id}/simulations/${
            item.id
          }/delete/`}
          className="delete"
        >
          <span className="helper">Delete</span>
        </a>
      </div>
    </div>
  );
};

export default SimulationValueCard;
