package com.crm.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.crm.backend.models.*;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	
    List<User> findByRoleName(String roleName);

  //Optional<User> findByUsername(String username);
  User findByUsername(String username);
  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);
 
	@Query("SELECT u FROM User u WHERE u.username = :username")
	public User getUserByUsername(@Param("username") String username);
	
	 Page<User> findAll(Pageable pageable);
	    
	    User findTopByOrderByIdDesc();
		 
		   public User findUserByUsername(String username);
		   public User findUserByEmail(String email);
		   
		   @Query("SELECT c FROM User c WHERE c.email = ?1")
		    public User findByEmail(String email); 
		     
		    public User findByResetPasswordToken(String token);
}
