import React, { Component } from 'react';
import MonitorChildCard from "../../../components/managestream/MonitorChildCard";
import StepConnectorSVG from '../../../assets/step_connector.svg';

export default function MonitorContent() {
    return (
        <div className="monitor__body">
            <MonitorChildCard />
            <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
            </div>
            <MonitorChildCard />
            <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
            </div>
            <MonitorChildCard />
            <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
            </div>
            <MonitorChildCard />
        </div>
    )
}
