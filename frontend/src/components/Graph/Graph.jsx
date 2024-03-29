import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HeartbeatGraph = ({ heartbeatData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (heartbeatData.length === 0) return;

    const labels = heartbeatData.map(entry => entry.month);
    const data = heartbeatData.map(entry => entry.heartbeat);

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Heartbeat',
          data: data,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [heartbeatData]);

  return (
    <div>
      <h2>Heartbeat Data</h2>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default HeartbeatGraph;
