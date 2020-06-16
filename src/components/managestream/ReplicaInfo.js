import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

const ReplicaInfo = ({
  projectId,
  streamProcessorId,
  userId,
  requestedReplicas,
}) => {
  const [replicas, setReplicas] = useState(0);

  useEffect(() => {
    let socket;
    const webSocketUrl = process.env.REACT_APP_WEBSOCKET_SERVER;
    console.log(webSocketUrl);

    if (webSocketUrl) {
      const socket = io(webSocketUrl);
      const id = uuidv4();
      socket.on("connect", () => {
        // register for events
        socket.emit("streamprocessors", {
          id,
          data: {
            project_id: projectId,
            streamprocessor_id: streamProcessorId,
            user_id: userId,
          },
        });
        // socket.emit('simulations', {id, data:  {project_id: projectId, simulation_id: streamProcessorId, user_id: userId}});
      });

      // wait for reply
      socket.on("streamprocessor-reply", (data) => {
        if (data.id === id) {
          setReplicas((replicas) => data.replicas || replicas);
        }
      });
      socket.on("simulation-reply", (data) => {
        console.log(data);
      });
      socket.on("event-reply", (data) => {
        console.log(data);
      });
    }

    return () => {
      socket && socket.close();
    };
  }, [projectId, streamProcessorId, userId]);

  return (
    <div>
      <div className="cardBody">
        <div className="grid">
          <div className="cardItem smallItem">
            <span className="cardInput" data-header="Requested Replicas">
              {requestedReplicas}
            </span>
          </div>
          <div className="cardItem smallItem">
            <span className="cardInput" data-header="Actual Replicas">
              {replicas}
            </span>
          </div>
        </div>
        <span
          className={classNames("cardInput", {
            greenOutline: requestedReplicas === replicas,
            blueOutline: replicas === 0,
            redOutline: requestedReplicas !== replicas,
          })}
          data-header="Status"
        >
          {requestedReplicas === replicas
            ? "Healthy"
            : replicas !== requestedReplicas
            ? "Unhealthy"
            : "Not deployed"}
        </span>
      </div>
    </div>
  );
};

export default ReplicaInfo;
