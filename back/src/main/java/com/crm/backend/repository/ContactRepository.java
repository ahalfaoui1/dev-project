package com.crm.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.crm.backend.models.Contact;
import com.crm.backend.models.User;



@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@Repository
public interface ContactRepository extends CrudRepository<Contact, Long> {
	
	List<Contact> findByStatus(String status);
  
	 Page<Contact> findAll(Pageable pageable);
	 //Page<Contact> findAll(Pageable pageable);
	// Page<Contact> findByTypecontact(TypeContact  typecontact, Pageable pageable);
	   // Page<Lead> findByFilter(TypeContact  typecontact, Pageable pageable);
	// @Query("SELECT l FROM Lead l WHERE (LOWER(l.nom) LIKE LOWER(concat('%', :search, '%')) OR LOWER(l.prenom) LIKE LOWER(concat('%', :search, '%'))) AND l.statusLead = :statusLead AND l.typecontact = :typecontact")

	 @Query("SELECT c FROM Contact c WHERE (UPPER(c.lastName) LIKE %:search% OR UPPER(c.firstName) LIKE %:search%) OR c.status = :status OR c.type = :type")
	 Page<Contact> getPageContactByCustomFilter(
	     Pageable pageable,
	     @Param("search") String search,
	     @Param("status") String status,
	     @Param("type") String type
	 );
	 @Query("SELECT c FROM Contact c WHERE ((UPPER(c.lastName) LIKE %:search% OR UPPER(c.firstName) LIKE %:search%) OR c.status = :status OR c.type = :type) AND c.contactOwner.role.name =:role")
	 Page<Contact> getPageContactByCustomFilterbyRole(
	     Pageable pageable,
	     @Param("search") String search,
	     @Param("status") String status,
	     @Param("type") String type,
	     @Param("role") String role
	 );
	 //Contact findTopByOrderByIdDesc();
	 
	 
	 @Query("SELECT DISTINCT c FROM Contact c JOIN c.activities a")
	    List<Contact> findContactsWithActivities();
	 	 
	
}
