import React, { Component } from "react";
import {Switch, BrowserRouter, withRouter, Route} from "react-router-dom";
import ManageStreamProcessor from "./containers/streamprocessor/home";
import MonitorStreamProcessor from "./containers/streamprocessor/monitor";
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
            <BrowserRouter>
              <Switch>
                <Route exact path='/streamprocessors' component={ManageStreamProcessor} />
                <Route path='/streamprocessors/monitor' component={MonitorStreamProcessor} />
              </Switch>
            </BrowserRouter>
          </AppLayout>
      );
    } else {
    }
  }
}

export default withRouter(Routes);
