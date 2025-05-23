import React, { useEffect, useState } from "react";

import { Category, ExpenseType, type Expense, type ExpenseFormData } from "../types";
import {  getAllExpenses, createExpense, deleteExpense } from "../services/expense";
import NewExpense from "./NewExpense";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseFilter, setExpenseFilter] = useState<ExpenseType | undefined>(undefined);
  const [categoryFilter, setCategoryFilter] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const fetchExpenses = async () => {
      const data = await getAllExpenses();
      setExpenses(data);
    };
    fetchExpenses();
  }, []);

  const saveExpense = async (expense: ExpenseFormData) => {
    try {
      const savedExpense = await createExpense(expense);
      setExpenses((prevExpenses) => [...prevExpenses, savedExpense]);
    } catch (error) {
      console.error("Error saving expense:", error);
    }
  };

  const deleteExpenseById = async (id: number) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };  

  const filteredExpenses = expenses.filter((expense) => {
    const matchesExpenseType = expenseFilter ? expense.type === expenseFilter : true;
    const matchesCategory = categoryFilter ? expense.category === categoryFilter : true;
    return matchesExpenseType && matchesCategory;
  });

  return (
    <div>
      {/* {errorMessage && <Notification errorMessage={errorMessage} />} */}
      <NewExpense onSave={saveExpense} />
      <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ backgroundColor: "#cccccc" }}>
          <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left' }}>Name</th>
          <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left' }}>Amount</th>
            <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left' }}>Expense Type
              <select value={expenseFilter}
                onChange={e => setExpenseFilter(e.target.value  as ExpenseType)}
                style={{ marginLeft: '8px', padding: '2px 6px', fontSize: '0.95em' }}
              >
                <option value="">All</option>
                {Object.values(ExpenseType).map((type) =>
                  (<option key={type} value={type}>{type}</option>))}
              </select>
          </th>
          <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left' }}>Category
            <select value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value as Category)}
              style={{ marginLeft: '8px', padding: '2px 6px', fontSize: '0.95em' }}
            >
              <option value="">All</option>
              {Object.values(Category).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </th>
          <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left' }}>Date</th>
          <th style={{ border: '1px solid #000', padding: '12px', textAlign: 'left' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredExpenses.map((expense, index) => (
          <tr key={index}>
            <td style={{ padding: '12px', border: '1px solid #000' }}>{expense.name}</td>
            <td style={{ padding: '12px', border: '1px solid #000' }}>${expense.amount}</td>
            <td style={{ padding: '12px', border: '1px solid #000' }}>{expense.type}</td>
            <td style={{ padding: '12px', border: '1px solid #000' }}>{expense.category}</td>
            <td style={{ padding: '12px', border: '1px solid #000' }}>{expense.date}</td>
            <td style={{ padding: '12px', border: '1px solid #000' }}>
              <button style={{ padding: '8px', border: '1px solid #000', backgroundColor: '#ff653c', borderRadius: '8px', marginLeft: '10px' }}
                onClick={() => deleteExpenseById(expense.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
          <tr>
            <td style={{ padding: '12px' }}>Total: </td>
            <td style={{ padding: '12px' }}>
               ${filteredExpenses.reduce((total, expense) => total + expense.amount, 0)}
            </td>
          </tr>
        </tfoot>
    </table>
    </div>
  );
};

export default Expenses;
