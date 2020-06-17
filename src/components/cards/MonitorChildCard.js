import React, { useEffect, useState } from "react";
import MonitorLineChart from "./MonitorLineChart";
import io from "socket.io-client";

function MonitorChildCard({ parent, title, projectId, streamProcessorId }) {
  const [eventsProcessed, setEventsProcessed] = useState(0);
  const [bytesProcessed, setBytesProcessed] = useState(0);
  const [eventsPerSecond, setEventsPerSecond] = useState(0);
  const [bytesPerSecond, setBytesPerSecond] = useState(0);

  useEffect(() => {
    let socket;
    const webSocketUrl =
      "3.249.227.197:8888" || process.env.REACT_APP_WEBSOCKET_SERVER;

    if (webSocketUrl) {
      const socket = io(webSocketUrl);
      socket.on("connect", () => {
        // register for events: register with projectId and streamprocessorId
        socket.emit("events-register", `${projectId}${streamProcessorId}`);
      });

      // wait for reply
      socket.on(`event-reply`, (data) => {
        if (data) {
          setEventsProcessed((events) => data.events_processed || events);
          setBytesProcessed((bytes) => data.bytes_processed || bytes);
          setEventsPerSecond((eventsPS) => data.events_ps || eventsPS);
          setBytesPerSecond((bytesPS) => data.bytes_ps || bytesPS);
        }
      });

      // wait for reply
      socket.on(`message-reply`, (data) => {
        console.log(data)
      });
    }

    return () => {
      socket && socket.close();
    };
  }, [projectId, streamProcessorId]);
  return (
    <div className="monitor__body_tab_child">
      <span className="monitor__body_tab_child_header">{title}</span>
      <div className="monitor__body_tab_child_content">
        <div className="row">
          <div className="col-md-6 content_status">
            <div className="content_status_col border_right">
              <div className="inboud_event_chart_total">
                <div className="pie-wrapper progress-90">
                  <span className="label">{eventsPerSecond}</span>
                  <div className="pie">
                    <div className="left-side half-circle"></div>
                    <div className="right-side half-circle"></div>
                  </div>
                </div>
              </div>
              <div className="content_status_desc">
                Bytes <br /> Per Second
              </div>
            </div>
            <div className="content_status_col">
              <div className="inboud_event_chart_total">
                <div className="pie-wrapper progress-90">
                  <span className="label">{bytesPerSecond}</span>
                  <div className="pie">
                    <div className="left-side half-circle"></div>
                    <div className="right-side half-circle"></div>
                  </div>
                </div>
              </div>
              <div className="content_status_desc">
                Events <br /> Per Second
              </div>
            </div>
            <div className="content_status_col">
              <div className="content_status_amount text-left">
                {eventsProcessed}
              </div>
              <div
                className="content_status_desc text-left"
                style={{ marginBottom: 13 }}
              >
                Events Processed
              </div>
              <div className="content_status_amount text-left">
                {(bytesProcessed / 1024).toFixed(0)} <span>kb</span>
              </div>
              <div className="content_status_desc text-left">
                Data Processed
              </div>
            </div>
          </div>
          <div className="col-md-6 content_charts">
            <ul className="nav content_charts_nav">
              <li className="active">
                <a
                  href={`#${parent}-events-chart`}
                  data-toggle="tab"
                  className="active"
                >
                  Events Processed
                </a>
              </li>
              <li>
                <a href={`#${parent}-data-chart`} data-toggle="tab">
                  Data Processed
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id={`#${parent}-events-chart`}>
                <div className="content_chart">
                  <MonitorLineChart />
                </div>
              </div>
              <div className="tab-pane" id={`#${parent}-data-chart`}>
                <div className="content_chart">
                  <MonitorLineChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(
  MonitorChildCard,
  (prev, next) =>
    prev.projectId === next.projectId &&
    prev.streamProcessorId === next.streamProcessorId
);
