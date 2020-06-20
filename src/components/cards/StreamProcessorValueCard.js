import React from "react";
import ReplicaInfo from "../managestream/ReplicaInfo";
import axios from "axios";
import { API_URL } from "../../config";
import { notification } from "antd";

const StreamProcessorValueCard = ({ post: item }) => {
  const handleRun = () => {
    axios
      .post(`${API_URL}streamprocessor_action/run`, {
        project_id: item.project && item.project.id,
        streamprocessor_id: item.id,
      })
      .then((response) => {
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
  return (
    <div className="Valuecard">
      <h2 className="valueHeader">{item.name}</h2>
      <ReplicaInfo
        eventId={item.id}
        projectId={item.project && item.project.id}
        userId={item.owning_user && item.owning_user.id}
        requestedReplicas={item.replicas}
        eventType={"streamprocessor"}
      />
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
        <a
          href={`/projects/${
            item.project && item.project.id
          }/streamprocessors/${item.id}/stop/`}
          className="pause"
        >
          {/*STOP - Needs to go to - /projects/2/streamprocessors/3/stop/ -->*/}
          <span className="helper">Stop</span>
        </a>
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
