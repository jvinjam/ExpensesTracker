package com.example.expensetracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
	private ExpenseService expenseService;

	public ExpenseController(ExpenseService expenseService) {
		this.expenseService = expenseService;
	}

	@GetMapping
	public List<Expense> getAll() {
		return expenseService.getAll();
	}

	@GetMapping("/{id}")
	public Expense getById(@PathVariable Integer id) {
		return expenseService.getById(id);
	}

	@PostMapping
	public Expense create(@RequestBody Expense expense) {
		return expenseService.save(expense);
	}

	@PutMapping("/{id}")
	public Expense update(@PathVariable Integer id, @RequestBody Expense expense) {
		return expenseService.update(id, expense);
	}

	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		expenseService.delete(id);
	}
}
