import React, { useEffect, useState } from "react";

import {
  Category,
  ExpenseType,
  type Expense,
  type ExpenseFormData,
} from "../types";
import {
  getAllExpenses,
  createExpense,
  deleteExpense,
} from "../services/expense";
import NewExpense from "./NewExpense";

import "./Expense.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseFilter, setExpenseFilter] = useState<ExpenseType | undefined>(
    undefined
  );
  const [categoryFilter, setCategoryFilter] = useState<Category | undefined>(
    undefined
  );

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
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesExpenseType = expenseFilter
      ? expense.type === expenseFilter
      : true;
    const matchesCategory = categoryFilter
      ? expense.category === categoryFilter
      : true;
    return matchesExpenseType && matchesCategory;
  });

  return (
    <div>
      {/* {errorMessage && <Notification errorMessage={errorMessage} />} */}
      <NewExpense onSave={saveExpense} />
      <table>
        <thead>
          <tr style={{ backgroundColor: "#cccccc" }}>
            <th>Name</th>
            <th>Amount</th>
            <th>
              Expense Type
              <select
                value={expenseFilter}
                onChange={(e) =>
                  setExpenseFilter(e.target.value as ExpenseType)
                }
                className="filter"
              >
                <option value="">All</option>
                {Object.values(ExpenseType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </th>
            <th>
              Category
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as Category)}
                className="filter"
              >
                <option value="">All</option>
                {Object.values(Category).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.name}</td>
              <td>${expense.amount}</td>
              <td>{expense.type}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteExpenseById(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="total">Total: </td>
            <td className="total">
              $
              {filteredExpenses.reduce(
                (total, expense) => total + expense.amount,
                0
              )}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Expenses;
