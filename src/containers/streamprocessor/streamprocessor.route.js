import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import ManageStreamProcessor from "./home";
import MonitorStreamProcessor from "./monitor";
import AppLayout from "../../components/layouts/app.layout";

class StreamprocessorRoute extends Component {
    render() {
        return (
            <AppLayout>
                <Switch>
                    <Route exact path='/streamprocessors' component={ManageStreamProcessor} />
                    <Route path='/streamprocessors/monitor' component={MonitorStreamProcessor} />
                </Switch>
            </AppLayout>
        )
    }
}

export default withRouter(StreamprocessorRoute);
