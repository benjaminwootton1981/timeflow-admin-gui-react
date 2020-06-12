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
            <BrowserRouter>
              <Switch>
                <Route exact path='/react/' component={ManageStreamProcessor} />
                <Route path='/react/monitor' component={MonitorStreamProcessor} />
              </Switch>
            </BrowserRouter>
          </AppLayout>
      );
    } else {
    }
  }
}

export default withRouter(Routes);
