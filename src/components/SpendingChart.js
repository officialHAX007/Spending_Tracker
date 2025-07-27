import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function SpendingChart({ entries, view }) {
  const grouped = {};

  entries.forEach(e => {
    const date = new Date(e.date);
    let key = '';
    if (view === 'daily') {
      key = e.date;
    } else if (view === 'weekly') {
      const week = Math.ceil(date.getDate() / 7);
      key = `${e.date.slice(0, 7)}-W${week}`;
    } else {
      key = e.date.slice(0, 7); // "YYYY-MM"
    }
    grouped[key] = (grouped[key] || 0) + parseFloat(e.amount);
  });

  const labels = Object.keys(grouped).sort();
  const data = labels.map(label => grouped[label]);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            label: 'Amount Spent',
            data,
            borderColor: '#00BFFF',
            fill: false,
            tension: 0.2,
          },
        ],
      }}
    />
  );
}

export default SpendingChart;
