import React, { Component } from "react";
import { Switch, BrowserRouter, withRouter, Route } from "react-router-dom";
import {
  MonitorStreamProcessor,
  NewStreamProcessor,
} from "./pages/streamProcessor";
import { ManageStream } from "./pages/stream";
import { ManageSimulation } from "./pages/simulation";
import AppLayout from "./components/layouts/app.layout";
import ManageStreamProcessor from "./pages/streamProcessor/list";

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: true,
    };
  }
  render() {
    if (this.state.isAuth) {
      return (
        <BrowserRouter basename={"/react"}>
          <AppLayout>
            <Switch>
              {/* <Route exact path='/' component={ManageStreamProcessor} /> */}
              <Route
                exact
                path="/projects/:id/streamprocessors/:streamprocessor_id/monitor/"
                component={MonitorStreamProcessor}
              />
              # Access From Django - Streams Index Page -
              /react/projects/9/streams/
              <Route
                exact
                path="/projects/:id/streams/"
                component={ManageStream}
              />
              # Access From Django - Simulations Index Page -
              /react/projects/9/simulations/
              <Route
                exact
                path="/projects/:id/simulations/"
                component={ManageSimulation}
              />
              # Access From Django - Stream Processors Index Page -
              /react/projects/9/streamprocessors/
              <Route
                exact
                path="/projects/:id/streamprocessors/"
                component={ManageStreamProcessor}
              />
              # Access From React - Stream Processors Monitor Page
              <Route
                exact
                path="/projects/:id/streamprocessors/:processor_id/monitor"
                component={MonitorStreamProcessor}
              />
              # Access From React - Stream Processors New/Edit Page
              <Route
                exact
                path="/projects/:id/streamprocessors/new"
                component={NewStreamProcessor}
              />
            </Switch>
          </AppLayout>
        </BrowserRouter>
      );
    } else {
    }
  }
}

export default withRouter(Routes);
