import React from "react";
import './style.scss';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from '@material-ui/core/AppBar';

import { TabPanel } from "../../../components/common";

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default function MonitorStreamProcessor() {

    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div className="wrapper">
            <h2 className="dashboard__header">New Stream Processor</h2>
        </div>
    );
}

