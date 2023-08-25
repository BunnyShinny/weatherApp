import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const AreaChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous instance if it exists
    }

    const ctx = chartRef.current.getContext("2d");

    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Area Chart",
            data: [10, 20, 15, 25, 30],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            title: {
              display: false,
              text: "Hours",
            },
          },
          y: {
            title: {
              display: false,
              text: "Value",
            },
          },
        },
      },
    });

    chartInstanceRef.current = newChartInstance; // Store the new instance
  }, [data]);

  return (
    <div className="flex justify-center rounded-lg bg-white h-full w-full overflow-hidden border border-gray-300">
      <div className="h-full w-full">
        <canvas className="p-3" ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default AreaChart;
