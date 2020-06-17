import React from "react";
import "./style.scss";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";

import { TabPanel } from "../../../components/common";
import MonitorContent from "./MonitorContent";

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function MonitorStreamProcessor(props) {
  const [tab, setTab] = React.useState(0);

  const { id, streamprocessor_id } = props.match.params;

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
            </Tabs>
          </AppBar>
        </div>
        <TabPanel value={tab} index={0}>
          <MonitorContent
            projectId={id}
            streamProcessorId={streamprocessor_id}
          />
        </TabPanel>
      </div>
    </div>
  );
}
