import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HeartbeatPieChart = ({ heartbeatData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (heartbeatData.length === 0) return;

    const labels = heartbeatData.map(entry => entry.month);
    const data = heartbeatData.map(entry => entry.heartbeat);

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Heartbeat',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            // Add more colors if needed
          ],
          hoverOffset: 4
        }]
      }
    });
  }, [heartbeatData]);

  return (
    <div>
      <h2>Heartbeat Data (Pie Chart)</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default HeartbeatPieChart;
