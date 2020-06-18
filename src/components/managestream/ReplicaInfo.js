import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";

const ReplicaInfo = ({
  projectId,
  eventId,
  userId,
  requestedReplicas,
  eventType,
}) => {
  const [replicas, setReplicas] = useState(0);

  useEffect(() => {
    let socket;
    const webSocketUrl =
      "63.34.163.101" || process.env.REACT_APP_WEBSOCKET_SERVER;

    if (webSocketUrl) {
      const socket = io(webSocketUrl);
      const id = uuidv4();
      socket.on("connect", () => {
        // register for events
        const data = {
          project_id: projectId,
          user_id: userId,
          [`${eventType}_id`]: eventId,
        };

        socket.emit(`${eventType}s`, {
          id,
          data,
        });
      });

      // wait for reply
      socket.on(`${eventType}-reply`, (data) => {
        if (data.id === id) {
          setReplicas((replicas) => data.replicas || replicas);
        }
      });

      if (eventType === "simulation"){
        socket.emit("events-register", `${userId}${eventId}${projectId}`)
      }
    }

    return () => {
      socket && socket.close();
    };
  }, [projectId, eventId, userId, eventType]);

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
