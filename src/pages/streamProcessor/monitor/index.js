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
        <MonitorContent projectId={id} streamProcessorId={streamprocessor_id} />
      </div>
    </div>
  );
}
