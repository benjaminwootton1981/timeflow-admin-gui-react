import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import store from "./store";
import Routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap";
import "bootstrap/dist/js/bootstrap.js";
import * as serviceWorker from "./serviceWorker";
import "./global.scss";
import "antd/lib/notification/style/css";
import "antd/lib/message/style/css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <App>
          <Routes />
        </App>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
