import { useState, useEffect } from 'react';
import spendingCategories from '../data/spending-category.json';

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('spendingEntries')) || [];
    const initialCats = spendingCategories.map(c => c.category);
    setEntries(saved);
    setCategories(initialCats);
  }, []);

  const addEntry = () => {
    const finalCategory = customCategory.trim() || category;
    if (!date || !finalCategory || !amount) return;

    const newEntry = { date, category: finalCategory, amount: parseFloat(amount) };
    const updated = [...entries, newEntry];
    setEntries(updated);
    localStorage.setItem('spendingEntries', JSON.stringify(updated));

    setDate('');
    setCategory('');
    setCustomCategory('');
    setAmount('');
  };

  const deleteEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    localStorage.setItem('spendingEntries', JSON.stringify(updated));
  };

  const selectedDescription = spendingCategories.find(c => c.category === category)?.description;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Spending Journal</h1>

      <div className="my-2">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mr-2 border px-2 py-1"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mr-2 border px-2 py-1"
        >
          <option disabled value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Or new category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="mr-2 border px-2 py-1"
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="mr-2 border px-2 py-1"
        />
        <button
          onClick={addEntry}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      {selectedDescription && (
        <p className="text-sm text-gray-500 mb-2">💡 {selectedDescription}</p>
      )}

      <ul className="mt-4">
        {entries.map((e, i) => (
          <li key={i} className="border-b py-1 flex justify-between">
            {e.date} - {e.category} - ${e.amount}
            <button onClick={() => deleteEntry(i)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
