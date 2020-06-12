import React from "react";
import './style.scss';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from '@material-ui/core/AppBar';

import { TabPanel } from "../../../components/common";
import MonitorContent from "./MonitorContent";

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
            <h2 className="dashboard__header">Monitor Stream Processor</h2>
            <div className="monitor">
                <div className="monitor__tabs">
                    <AppBar position="static" color="default">
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab label="Overall" {...a11yProps(0)} />
                            <Tab label="Replica 1" {...a11yProps(1)} />
                            <Tab label="Replica 2" {...a11yProps(2)} />
                            <Tab label="Replica 3" {...a11yProps(3)} />
                            <Tab label="Replica 4" {...a11yProps(4)} />
                            <Tab label="Replica 5" {...a11yProps(5)} />
                            <Tab label="Replica 6" {...a11yProps(6)} />
                            <Tab label="Replica 7" {...a11yProps(7)} />
                            <Tab label="Replica 8" {...a11yProps(8)} />
                            <Tab label="Replica 9" {...a11yProps(9)} />
                            <Tab label="Replica 10" {...a11yProps(10)} />
                        </Tabs>
                    </AppBar>
                </div>
                <TabPanel value={tab} index={0}>
                    <MonitorContent />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    Item Three
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    Item Four
                </TabPanel>
                <TabPanel value={tab} index={4}>
                    Item Five
                </TabPanel>
                <TabPanel value={tab} index={5}>
                    Item Six
                </TabPanel>
                <TabPanel value={tab} index={6}>
                    Item Seven
                </TabPanel>
            </div>
        </div>
    );
}

