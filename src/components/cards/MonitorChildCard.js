import React, { useCallback, useEffect, useState } from "react";
import MonitorLineChart from "./MonitorLineChart";
import io from "socket.io-client";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import moment from "moment";

function MonitorChildCard({ parent, title, projectId, streamProcessorId }) {
  const websocketServer = useSelector((state) => state.config.websocket_server);

  const [eventsProcessed, setEventsProcessed] = useState(0);
  const [bytesProcessed, setBytesProcessed] = useState(0);
  const [eventsPerSecond, setEventsPerSecond] = useState(0);
  const [bytesPerSecond, setBytesPerSecond] = useState(0);

  const [chartType, setChartType] = useState("event");

  const [eventDataPoints, setEventDataPoints] = useState([]);
  const [bytesDataPoints, setBytesDataPoints] = useState([]);

  const update = useCallback(
    throttle((data) => {
      if (data) {
        setEventsProcessed((events) => data.events_processed || events);
        setBytesProcessed((bytes) => data.bytes_processed || bytes);
        setEventsPerSecond((eventsPS) => data.events_ps || eventsPS);
        setBytesPerSecond((bytesPS) => data.bytes_ps || bytesPS);
      }
    }, 1000),
    []
  );

  const updateDataPoints = useCallback(
    throttle((data) => {
      if (data) {
        setEventDataPoints((dataPoints) => [
          ...dataPoints,
          { label: moment(), data: data.events_processed },
        ]);
        setBytesDataPoints((dataPoints) => [
          ...dataPoints,
          { label: moment(), data: (data.bytes_processed / 1024).toFixed(0) },
        ]);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    let socket;

    if (websocketServer) {
      const socket = io(websocketServer);
      socket.on("connect", () => {
        // register for events: register with projectId and streamprocessorId
        socket.emit("events-register", `${projectId}${streamProcessorId}`);
      });

      // wait for reply
      socket.on(`event-reply`, (data) => {
        update(data);
        updateDataPoints(data);
      });
    }

    return () => {
      socket && socket.close();
    };
  }, [projectId, streamProcessorId, update, websocketServer, updateDataPoints]);
  return (
    <div className="monitor__body_tab_child">
      <span className="monitor__body_tab_child_header">
        {title} ({parent})
      </span>
      <div className="monitor__body_tab_child_content">
        <div className="row">
          <div className="col-md-6 content_status">
            <div className="content_status_col border_right">
              <div className="inboud_event_chart_total">
                <div className="pie-wrapper progress-90">
                  <span className="label">
                    {(bytesPerSecond / 1024).toFixed(0)}
                  </span>
                  <div className="pie">
                    <div className="left-side half-circle"></div>
                    <div className="right-side half-circle"></div>
                  </div>
                </div>
              </div>
              <div className="content_status_desc">
                KB <br /> Per Second
              </div>
            </div>
            <div className="content_status_col">
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
              <li onClick={() => setChartType("event")}>
                <span data-toggle="tab" className="active">
                  Events Processed
                </span>
              </li>
              <li onClick={() => setChartType("bytes")}>
                <span data-toggle="tab">Data Processed</span>
              </li>
            </ul>
            <div className="tab-content">
              <div className="content_chart">
                {chartType === "event" ? (
                  <MonitorLineChart
                    dataPoints={eventDataPoints}
                    chartType={"Events"}
                  />
                ) : (
                  <MonitorLineChart
                    dataPoints={bytesDataPoints}
                    chartType={"Data"}
                  />
                )}
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
