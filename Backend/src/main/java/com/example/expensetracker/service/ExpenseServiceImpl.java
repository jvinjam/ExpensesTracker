package com.example.expensetracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {
	@Autowired
	private ExpenseRepository repository;

	@Override
	public List<Expense> getAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Expense getById(Integer id) {
		// TODO Auto-generated method stub
		return repository.findById(id).orElseThrow(() -> new RuntimeException());
	}

	@Override
	public Expense save(Expense expense) {
		// TODO Auto-generated method stub
		return repository.save(expense);
	}

	@Override
	public Expense update(Integer id, Expense expense) {
		// TODO Auto-generated method stub
		Expense existingExpense = repository.findById(id).orElseThrow(() -> new RuntimeException());
		existingExpense.setName(expense.getName());
		existingExpense.setAmount(expense.getAmount());
		existingExpense.setType(expense.getType());
		existingExpense.setCategory(expense.getCategory());
		existingExpense.setDate(expense.getDate());
		return repository.save(existingExpense);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}

}
