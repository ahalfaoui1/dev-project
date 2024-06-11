package com.crm.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.crm.backend.models.*;



@Repository
public interface PermissionRoleRepository extends CrudRepository<PermissionRole, Long> {
  
	 Page<PermissionRole> findAll(Pageable pageable);
	
}



