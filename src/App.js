import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useStore } from "react-redux";
import { API_URL } from "./config";
import { CONSTANTS } from "./store/constants";
import { notification } from "antd";
import io from "socket.io-client";

notification.config({
  duration: 10,
});

const App = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [websocketServer, setWebSocketServer] = useState();
  const userId = user && user.id;

  useEffect(() => {
    let socket;

    if (websocketServer && userId) {
      const socket = io(websocketServer);
      socket.on("connect", () => {
        //  register for events
        socket.emit("events-register", `CURRENT_USER_${userId}`);
      });

      // wait for reply
      socket.on(`message-reply`, (data) => {
        if (data) {
          notification[data.type]({
            message: data.message,
          });
        }
      });
    }

    return () => {
      socket && socket.close();
    };
  }, [userId, websocketServer]);

  useEffect(() => {
    axios
      .get(`${API_URL}me`)
      .then((response) => {
        setUser(response.data);
        dispatch({ type: CONSTANTS.GET_CURRENT_USER, payload: response.data });
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`${API_URL}site_configuration/`)
      .then((response) => {
        const websocketServer = response.data.websocket_server;
        setWebSocketServer(websocketServer);
        dispatch({
          type: CONSTANTS.GET_WEBSOCKET_SERVER,
          payload: websocketServer,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [dispatch]);

  return children;
};

export default App;
