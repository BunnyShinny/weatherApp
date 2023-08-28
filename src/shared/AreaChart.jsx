import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

const AreaChart = ({ data, label }) => {
  const chartRef = useRef(null);
  let xLabel = "";
  const chartInstanceRef = useRef(null);
  const [value, setValue] = useState([]);
  const [hour, setHour] = useState([]);

  useEffect(() => {
    if (data) {
      const updatedHour = data.map((hourly) => {
        const hour = moment(hourly.time).format("LT");
        return hour;
      });
      const updatedValue = data.map((hourly) => {
        if (label === "Temperature") {
          xLabel = "Temperature (°C)";
          return hourly.temp_c;
        }
        if (label === "Rain Chance") {
          xLabel = "Rain Chance (%)";
          return hourly.chance_of_rain;
        }
      });
      if (label) {
      }
      setValue(updatedValue);
      setHour(updatedHour);
    }
  }, [data]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous instance if it exists
    }

    const ctx = chartRef.current.getContext("2d");

    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: hour,
        datasets: [
          {
            label: xLabel,
            data: value,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: "start",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: { tension: 0 },
        },
        scales: {
          x: {
            type: "category",
            title: {
              display: false,
              text: "Hours",
              color:'rgba(75, 192, 192, 1)'
              
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: xLabel,
              color:'rgba(75, 192, 192, 1)'

            },
            grid: {
              display: false,
            },
          },
        },
      },
    });

    chartInstanceRef.current = newChartInstance; // Store the new instance
  }, [data]);

  return (
    <div className="flex justify-center rounded-lg bg-white h-full w-full overflow-hidden border border-gray-300">
      <div className="flex-1 h-full w-full">
        <canvas className="p-3 " ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default AreaChart;
