import React, { Component } from 'react';
import MonitorChildCard from "../../../components/cards/MonitorChildCard";
import StepConnectorSVG from '../../../assets/step_connector.svg';

export default function MonitorContent() {
    return (
        <div className="monitor__body">
            <MonitorChildCard parent='inbound' title='Inbound Event' />
            <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
            </div>
            <MonitorChildCard parent='simple' title='Simple Filter' />
            <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
            </div>
            <MonitorChildCard parent='stream' title='Stream Lookup' />
            <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
            </div>
            <MonitorChildCard parent='map' title='Map to Event Type' />
            <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
            </div>
            <MonitorChildCard parent='outbound' title='Outbound Step' />
        </div>
    )
}
