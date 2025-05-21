package com.example.expensetracker.service;

import java.util.List;

import com.example.expensetracker.model.Transaction;

public interface TransactionService {
	List<Transaction> getAll();

	Transaction getById(Integer id);

	Transaction save(Transaction transaction);

	Transaction update(Integer id, Transaction transaction);

	void delete(Integer id);
}
