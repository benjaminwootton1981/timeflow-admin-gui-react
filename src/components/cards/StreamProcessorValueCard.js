import React from "react";
import ReplicaInfo from "../managestream/ReplicaInfo";
import { notification } from "antd";
import api from "../../api";
import DragIcon from "../../assets/drag-icon.svg";

const StreamProcessorValueCard = ({ post: item, isDragging }) => {
  const handleAction = (action) => {
    return api.post(`streamprocessor_action/${action}`, {
      project_id: item.project?.id || item.project,
      streamprocessor_id: item.id,
    });
  };
  const handleRun = () => {
    handleAction("run").then((response) => {
      const status = response.data.status;

      if (status === "success") {
        notification.success({
          message: "Stream Processor deployed successfully",
        });
      } else {
        notification.error({
          message: "Stream Processor deployment failed.",
        });
      }
    });
  };

  const handleStop = () => {
    handleAction("stop").then((response) => {
      const status = response.data.status;

      if (status === "success") {
        notification.success({
          message: "Stream Processor stopped",
        });
      } else {
        notification.error({
          message: "Stream Processor Stop failed, try again.",
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
          projectId={item.project?.id || item.project}
          userId={item.owning_user?.id || item.owning_user}
          requestedReplicas={item.replicas}
          eventType={"streamprocessor"}
        />
      </div>
      <div className="cardFooter">
        <a
          href={`/projects/${
            item.project && item.project.id
          }/streamprocessors/${item.id}/edit/`}
          className="edit"
        >
          {/*EDIT - Needs to go to - /projects/2/streamprocessors/3/edit/ -->*/}
          <span className="helper">Edit</span>
        </a>
        <a
          href={`/projects/${
            item.project && item.project.id
          }/streamprocessors/${item.id}/duplicate/`}
          className="duplicate"
        >
          {/*DUPLICATE -  Needs to go to - /projects/2/streamprocessors/3/duplicate/-->*/}
          <span className="helper">Duplicate</span>
        </a>
        <button onClick={handleRun} className="deploy">
          {/*DEPLOY - Needs to go to - /projects/2/streamprocessors/3/run/ -->*/}
          <span className="helper">Deploy</span>
        </button>
        <button className="pause" onClick={handleStop}>
          {/*STOP - Needs to go to - /projects/2/streamprocessors/3/stop/ -->*/}
          <span className="helper">Stop</span>
        </button>
        <a
          href={`/react/projects/${
            item.project && item.project.id
          }/streamprocessors/${item.id}/monitor/`}
          className="monitor"
        >
          {/*MONITOR - Needs to go to - /projects/2/streamprocessors/3/monitor/ -->*/}
          <span className="helper">Monitor</span>
        </a>
        <a
          href={`/projects/${
            item.project && item.project.id
          }/streamprocessors/${item.id}/delete/`}
          className="delete"
        >
          {/*DELETE  Needs to go to - /projects/2/streamprocessors/3/delete/ -->*/}
          <span className="helper">Delete</span>
        </a>
      </div>
    </div>
  );
};

export default StreamProcessorValueCard;
