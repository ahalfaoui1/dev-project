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

import com.crm.backend.models.*;

@RepositoryRestResource(collectionResourceRel = "comments", path = "comments")


@Repository
public interface CommentRepository extends CrudRepository<Comment, Long> {
  
	 Page<Comment> findAll(Pageable pageable);
	 
	 //   List<Comment> findByActivity_Contact_Id(@Param("contactId") Long contactId);
	    
	    /// Page<Note> findByActivity_Contact_Id(@Param("contactId") Long contactId, Pageable pageable);
	     /*@Query("SELECT n FROM Comment n WHERE n.activity.contact.id = :contactId")
	     Page<Comment> findCommentByContactId(@Param("contactId") Long contactId, Pageable pageable);
	     @Query("SELECT n FROM Comment n WHERE n.activity.company.id = :companyId")
	     Page<Comment> findCommentByCompanyId(@Param("companyId") Long companyId, Pageable pageable);*/

	
}



