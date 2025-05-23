import axios from "axios";

import { API_URL } from "../constants";
import type { Expense, ExpenseFormData } from "../types";

const getAllExpenses = async (): Promise<Expense[]> => {
  const response = await axios.get(`${API_URL}/expenses`);
  return response.data;
};

const getExpenseById = async (id: number): Promise<Expense> => {
  const response = await axios.get(`${API_URL}/expenses/${id}`);
  return response.data;
};

const createExpense = async (expense: ExpenseFormData): Promise<Expense> => {
  const response = await axios.post(`${API_URL}/expenses`, expense);
  return response.data;
};

const updateExpense = async (id: number, expense: Expense): Promise<Expense> => {
  const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
  return response.data;
};

const deleteExpense = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/expenses/${id}`);
};

export { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense };
