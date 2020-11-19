import React, { Fragment, useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { capitalize, upperCase } from "lodash";

const Status = {
  running: "running",
  stopped: "stopped",
  ended: "ended",
  notDeployed: "not_deployed",
};

const ReplicaInfo = ({
  projectId,
  eventId,
  userId,
  requestedReplicas,
  eventType,
  state,
}) => {
  const [replicas, setReplicas] = useState(0);
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
          greenOutline: state === Status.running,
          blueOutline: state === Status.notDeployed,
          redOutline:
            requestedReplicas !== replicas || state === Status.stopped,
        })}
        data-header="Status"
      >
        {capitalize(upperCase(state))}
      </span>
    </Fragment>
  );
};

export default ReplicaInfo;
