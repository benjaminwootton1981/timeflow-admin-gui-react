import React, { Fragment, useEffect, useState } from "react";
import MonitorChildCard from "../../../components/cards/MonitorChildCard";
import StepConnectorSVG from "../../../assets/step_connector.svg";
import api from "../../../api";

export default function MonitorContent({ projectId, streamProcessorId }) {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    api
      .get("streamprocessorstep/", {
        params: {
          streamprocessor: streamProcessorId,
        },
      })
      .then((response) => {
        setSteps(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [streamProcessorId]);

  return (
    <div className="monitor__body">
      {steps.map((step, index) => {
        return (
          <Fragment key={index}>
            <MonitorChildCard
              parent={step.steptype}
              title={step.name}
              projectId={projectId}
              streamProcessorId={streamProcessorId}
            />
            {index !== steps.length - 1 && (
              <div className="monitor__body_child_linter">
                <img src={StepConnectorSVG} alt="step connector" />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
