import React, { Component } from "react";
import { Switch, BrowserRouter, withRouter } from "react-router-dom";
import StreamprocessorRoute from "./containers/streamprocessor/streamprocessor.route";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: true
    };
  }
  render() {
    if (this.state.isAuth) {
      return (
        <BrowserRouter>
          <Switch>
            <StreamprocessorRoute />
          </Switch>
        </BrowserRouter>
      );
    } else {
    }
  }
}

export default withRouter(Routes);
