import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import ManageStreamProcessor from "./home";
import MonitorStreamProcessor from "./monitor";

class StreamprocessorRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/streamprocessors' component={ManageStreamProcessor} />
                <Route path='/streamprocessors/monitor' component={MonitorStreamProcessor} />
            </Switch>
        )
    }
}

export default withRouter(StreamprocessorRoute);
