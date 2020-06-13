import React from 'react';
import CanvasJSReact from '../../assets/canvasjs/canvasjs.react';
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function MonitorLineChart() {
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1", // "light1", "dark1", "dark2"
        axisY: {
            title: "Quantity",
            includeZero: true
        },
        axisX: {
            interval: 1
        },
        data: [{
            type: "line",
            toolTipContent: "{y}",
            dataPoints: [
                { x: 0, y: 1000 },
                { x: 1, y: 9052 },
                { x: 2, y: 1128 },
                { x: 3, y: 7631 },
                { x: 4, y: 2121 },
                { x: 5, y: 6329 }
            ]
        }]
    }

    return (
        <div>
            <CanvasJSChart options = {options} containerProps={{ width: '100%', height: 200}} />
        </div>
    );
}
