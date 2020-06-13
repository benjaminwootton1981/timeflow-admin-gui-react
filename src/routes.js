import React, { Component } from "react";
import {Switch, BrowserRouter, withRouter, Route} from "react-router-dom";
import { ManageStreamProcessor, MonitorStreamProcessor } from "./containers/streamprocessor";
import AppLayout from "./components/layouts/app.layout";

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
          <AppLayout>
            <BrowserRouter basename={"/react"}>
              <Switch>
                {/* <Route exact path='/' component={ManageStreamProcessor} />
                <Route exact path='/monitor' component={MonitorStreamProcessor} /> */}

                # Access From Django - Streams Index Page - /react/projects/9/streams/
                <Route exact path='/projects/9/streams/' component={ManageStreamProcessor} />

                # Access From Django - Simulations Index Page - /react/projects/9/simulations/
                <Route exact path='/projects/9/simulations/' component={ManageStreamProcessor} />

                # Access From Django - Stream Processors Index Page - /react/projects/9/streamprocessors/
                <Route exact path='/projects/9/streamprocessors/' component={ManageStreamProcessor} />

                # Access From React - Stream Processors Monitor Page 
                <Route exact path='/projects/9/streamprocessors/1/monitor' component={MonitorStreamProcessor} />

                # Access From React - Stream Processors New/Edit Page
                {/* <Route exact path='/projects/9/streamprocessors/new' component={NewMonitorStreamProcessor} /> */}

              </Switch>
            </BrowserRouter>
          </AppLayout>
      );
    } else {
    }
  }
}

export default withRouter(Routes);
