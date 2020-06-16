import React, { Component } from "react";
import MonitorChildCard from "../../../components/cards/MonitorChildCard";
import StepConnectorSVG from "../../../assets/step_connector.svg";

export default function MonitorContent({ projectId, streamProcessorId }) {
  return (
    <div className="monitor__body">
      <MonitorChildCard
        parent="inbound"
        title="Inbound Event"
        projectId={projectId}
        streamProcessorId={streamProcessorId}
      />
      <div className="monitor__body_child_linter">
        <img src={StepConnectorSVG} alt="step connector" />
      </div>
      <MonitorChildCard
        parent="simple"
        title="Simple Filter"
        projectId={projectId}
        streamProcessorId={streamProcessorId}
      />
      <div className="monitor__body_child_linter">
        <img src={StepConnectorSVG} alt="step connector" />
      </div>
      <MonitorChildCard
        parent="stream"
        title="Stream Lookup"
        projectId={projectId}
        streamProcessorId={streamProcessorId}
      />
      <div className="monitor__body_child_linter">
        <img src={StepConnectorSVG} alt="step connector" />
      </div>
      <MonitorChildCard
        parent="map"
        title="Map to Event Type"
        projectId={projectId}
        streamProcessorId={streamProcessorId}
      />
      <div className="monitor__body_child_linter">
        <img src={StepConnectorSVG} alt="step connector" />
      </div>
      <MonitorChildCard
        parent="outbound"
        title="Outbound Step"
        projectId={projectId}
        streamProcessorId={streamProcessorId}
      />
    </div>
  );
}
