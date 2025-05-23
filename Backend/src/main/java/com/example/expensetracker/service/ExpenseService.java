package com.example.expensetracker.service;

import java.util.List;

import com.example.expensetracker.model.Expense;

public interface ExpenseService {
	List<Expense> getAll();

	Expense getById(Integer id);

	Expense save(Expense expense);

	Expense update(Integer id, Expense expense);

	void delete(Integer id);
}
