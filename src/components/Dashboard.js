import React, { useState, useEffect } from 'react';
import SpendingChart from './SpendingChart';
import SpendingPie from './SpendingPie';
import { useLocation } from 'react-router-dom';

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [view, setView] = useState('monthly');
  const location = useLocation();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('spendingEntries')) || [];
    setEntries(saved);
  }, [location]);

  const totalAllTime = entries.reduce((acc, e) => acc + parseFloat(e.amount), 0);
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  const entriesThisMonth = entries.filter(e => e.date.startsWith(currentMonth));
  const totalMonth = entriesThisMonth.reduce((acc, e) => acc + parseFloat(e.amount), 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Spending Tracker</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <p>Total Spending (All Time): ${totalAllTime.toFixed(2)}</p>
        <p>Total Spending (Selected Month): ${totalMonth.toFixed(2)}</p>

        <label className="mr-2">Group By: </label>
        <select value={view} onChange={(e) => setView(e.target.value)} className="border px-2 py-1">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Spending Over Time (All Time - {view} view)</h3>
        {entries.length > 0 ? <SpendingChart entries={entries} view={view} /> : <p>No data</p>}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Spending Over Time (Selected Month - {view} view)</h3>
        {entriesThisMonth.length > 0 ? <SpendingChart entries={entriesThisMonth} view={view} /> : <p>No data</p>}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Spending by Category (All Time)</h3>
        {entries.length > 0 ? <SpendingPie entries={entries} /> : <p>No data</p>}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium mb-2">Spending by Category (Selected Month)</h3>
        {entriesThisMonth.length > 0 ? <SpendingPie entries={entriesThisMonth} /> : <p>No data</p>}
      </div>
    </div>
  );
}

export default Dashboard;
