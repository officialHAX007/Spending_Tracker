import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function SpendingPie({ entries }) {
  const grouped = {};
  entries.forEach(e => {
    grouped[e.category] = (grouped[e.category] || 0) + parseFloat(e.amount);
  });

  const labels = Object.keys(grouped);
  const data = labels.map(label => grouped[label]);

  if (labels.length === 0) {
    return <p>No data to display for Pie Chart.</p>;
  }

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <Pie
        data={{
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#FFCE56',
                '#4CAF50',
                '#9C27B0',
                '#FF9800',
                '#795548',
                '#03A9F4',
                '#8BC34A',
                '#E91E63'
              ],
            },
          ],
        }}
        width={300}
        height={300}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
              },
            },
          },
        }}
      />
    </div>
  );
}

export default SpendingPie;
