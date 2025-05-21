package com.example.expensetracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.expensetracker.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

}
