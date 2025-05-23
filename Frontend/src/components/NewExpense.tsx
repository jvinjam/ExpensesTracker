import { useState } from "react";
import type { SyntheticEvent } from "react";

import { Category, ExpenseType } from "../types";
import type { ExpenseFormData } from "../types";

interface props {
  onSave: (expense: ExpenseFormData) => void;
}

const NewExpense = ({ onSave }: props) => {
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: 0,
    type: ExpenseType.ONE_TIME,
    category: Category.OTHER,
    date: ""
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(newExpense);
  };

  return (
    <div>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <>
          <label>Name </label>
          <input type="text" value={newExpense.name} onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            required style={{ marginRight: '10px', padding: '8px' }} />
        </>
        <>
          <label>Amount </label>
          <input type="number" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
            required style={{ marginRight: '10px', padding: '8px', width: '80px' }} />
        </>
        <>
          <label>Expense Type </label>
          <select value={newExpense.type} onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value as ExpenseType })}
            style={{ marginRight: '10px', padding: '8px' }}>
            <option value={ExpenseType.ONE_TIME}>One Time</option>
            <option value={ExpenseType.RECURRING}>Recurring</option>
          </select>
        </>
        <>
          <label>Category </label>
          <select value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as Category })}
            style={{ marginRight: '10px', padding: '8px' }}>
            <option value={Category.FOOD}>Food</option>
            <option value={Category.ENTERTAINMENT}>Entertainment</option>
            <option value={Category.HEALTH}>Health</option>
            <option value={Category.TRAVEL}>Travel</option>
            <option value={Category.OTHER}>Other</option>
          </select>
        </>
        <>  
          <label>Date </label>
          <input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} required
            style={{ marginRight: '10px', padding: '8px' }} />
        </>
        <button type="submit" style={{
          padding: '8px', height: '36px', border: '1px solid #000', borderRadius: '8px', 
          backgroundColor: '#b5c292', cursor: 'pointer' }}>Add Expense</button>
      </form>
    </div>
  );
};

export default NewExpense;