package com.crm.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.crm.backend.models.RefreshToken;
import com.crm.backend.models.Role;
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
  
	// Optional<Role> findById( Long Role);
}
