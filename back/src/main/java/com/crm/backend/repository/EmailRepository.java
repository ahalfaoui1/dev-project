package com.crm.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.crm.backend.models.*;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RepositoryRestResource(collectionResourceRel = "emails", path = "emails")

@Repository
public interface EmailRepository extends CrudRepository<Email, Long> {
  
	 Page<Email> findAll(Pageable pageable);
	 
	    List<Email> findByActivity_Contact_Id(@Param("contactId") Long contactId);
	    
	    /// Page<Note> findByActivity_Contact_Id(@Param("contactId") Long contactId, Pageable pageable);
	     @Query("SELECT n FROM Email n WHERE n.activity.contact.id = :contactId")
	     Page<Email> findEmailByContactId(@Param("contactId") Long contactId, Pageable pageable);
	     @Query("SELECT n FROM Email n WHERE n.activity.company.id = :companyId")
	     Page<Email> findEmailByCompanyId(@Param("companyId") Long companyId, Pageable pageable);

	
}



