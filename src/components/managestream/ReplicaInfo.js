import React, { Fragment, useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Status = {
  healthy: "Healthy",
  running: "Running",
  complete: "Complete",
  stopped: "stopped",
  failed: "failed",
  notDeployed: "Not Deployed",
};

const ReplicaInfo = ({
  projectId,
  eventId,
  userId,
  requestedReplicas,
  eventType,
  isComplete,
}) => {
  const [replicas, setReplicas] = useState(undefined);
  const websocketServer = useSelector((state) => state.config.websocket_server);

  useEffect(() => {
    let socket;

    if (websocketServer) {
      const socket = io(websocketServer);
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
    }

    return () => {
      socket && socket.close();
    };
  }, [projectId, eventId, userId, eventType, websocketServer]);

  const getStatus = () => {
    if (isComplete) {
      return Status.complete;
    }
    if (requestedReplicas === replicas) {
      return Status.healthy;
    }
    if (replicas === undefined) {
      return Status.notDeployed;
    }

    if (replicas !== requestedReplicas) {
      //TODO check for restarts
      return Status.failed;
    }
  };

  return (
    <Fragment>
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
          blueOutline: replicas === 0 || replicas === undefined,
          redOutline: requestedReplicas !== replicas,
        })}
        data-header="Status"
      >
        {getStatus()}
      </span>
    </Fragment>
  );
};

export default ReplicaInfo;
