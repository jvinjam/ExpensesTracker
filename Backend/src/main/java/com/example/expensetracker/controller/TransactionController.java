package com.example.expensetracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expensetracker.model.Transaction;
import com.example.expensetracker.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
//@CrossOrigin(origins = "*")
public class TransactionController {
	private TransactionService transactionService;

	public TransactionController(TransactionService transactionService) {
		this.transactionService = transactionService;
	}

	@GetMapping
	public List<Transaction> getAll() {
		return transactionService.getAll();
	}

	@GetMapping("/{id}")
	public Transaction getById(@PathVariable Integer id) {
		return transactionService.getById(id);
	}

	@PostMapping
	public Transaction create(@RequestBody Transaction transaction) {
		return transactionService.save(transaction);
	}

	@PutMapping("/{id}")
	public Transaction update(@PathVariable Integer id, @RequestBody Transaction transaction) {
		return transactionService.update(id, transaction);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		transactionService.delete(id);
	}
}
