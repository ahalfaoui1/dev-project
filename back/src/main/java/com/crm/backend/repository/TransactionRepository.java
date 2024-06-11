package com.crm.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


import com.crm.backend.models.*;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {
  
	// Optional<Role> findById( Long Role);
}
