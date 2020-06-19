import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useStore } from "react-redux";
import { API_URL } from "./config";
import { CONSTANTS } from "./store/constants";
import { notification } from "antd";
import io from "socket.io-client";
import { capitalize } from "lodash";

notification.config({
  duration: 10,
});

const App = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const userId = user && user.id;

  useEffect(() => {
    let socket;
    const webSocketUrl =
      "54.77.136.131:8888" || process.env.REACT_APP_WEBSOCKET_SERVER;

    if (webSocketUrl && userId) {
      const socket = io(webSocketUrl);
      socket.on("connect", () => {
        //  register for events
        socket.emit("events-register", `CURRENT_USER_${userId}`);
      });

      // wait for reply
      socket.on(`message-reply`, (data) => {
        if (data) {
          notification[data.type]({
            message: capitalize(data.type),
            description: data.message,
          });
        }
      });
    }

    return () => {
      socket && socket.close();
    };
  }, [userId]);

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
  }, [dispatch]);

  return children;
};

export default App;
