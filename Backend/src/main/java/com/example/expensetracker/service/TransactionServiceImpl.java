package com.example.expensetracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.expensetracker.model.Transaction;
import com.example.expensetracker.repository.TransactionRepository;

@Service
public class TransactionServiceImpl implements TransactionService {
	@Autowired
	private TransactionRepository repository;

	@Override
	public List<Transaction> getAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Transaction getById(Integer id) {
		// TODO Auto-generated method stub
		return repository.findById(id).orElseThrow(() -> new RuntimeException());
	}

	@Override
	public Transaction save(Transaction transaction) {
		// TODO Auto-generated method stub
		return repository.save(transaction);
	}

	@Override
	public Transaction update(Integer id, Transaction transaction) {
		// TODO Auto-generated method stub
		Transaction existingTransaction = repository.findById(id).orElseThrow(() -> new RuntimeException());
		existingTransaction.setName(transaction.getName());
		existingTransaction.setAmount(transaction.getAmount());
		existingTransaction.setType(transaction.getType());
		existingTransaction.setCategory(transaction.getCategory());
		existingTransaction.setDate(transaction.getDate());
		return repository.save(existingTransaction);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		repository.deleteById(id);
	}

}
