import React from "react";
import { Line } from "react-chartjs-2";
import { takeRight } from "lodash";

export default function MonitorLineChart({ dataPoints, chartType }) {
  const events = takeRight(dataPoints, 6).map((dataPoint) => {
    return dataPoint.data;
  });
  const data = {
    labels: takeRight(dataPoints, 6).map((dataPoint) => dataPoint.label),
    datasets: [
      {
        label: chartType,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#803c8a",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#803c8a",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: events,
      },
    ],
  };

  return (
    <div>
      <Line
        data={data}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 6,
                },
              },
            ],
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "second",
                  displayFormats: {
                    second: "HH:mm:ss",
                  },
                },
                ticks: {
                  source: "labels",
                  maxTicksLimit: 6,
                },
              },
            ],
          },
        }}
        height={120}
      />
    </div>
  );
}
