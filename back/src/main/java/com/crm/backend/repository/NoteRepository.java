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
//@CrossOrigin(origins = "https://www.crm-decision.com", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = {"https://www.crm-decision.com", "http://localhost:4200", "http://212.132.104.88:4200", "http://crm.berneso.fr"}, maxAge = 3600, allowCredentials="true")
@RepositoryRestResource(collectionResourceRel = "notes", path = "notes")
@Repository
public interface NoteRepository extends CrudRepository<Note, Long> {
	Page<Note> findAll(Pageable pageable);
	void deleteAllByActivityId(Long activityId);

    
    List<Note> findByActivity_Contact_Id(@Param("contactId") Long contactId); 
   // List<Note> findByContactId(Long contactId);
    //List<Note> findByContactId(@Param("contactId") Long contactId);

        
   /// Page<Note> findByActivity_Contact_Id(@Param("contactId") Long contactId, Pageable pageable);
    @Query("SELECT n FROM Note n WHERE n.activity.contact.id = :contactId")
    Page<Note> findNotesByContactId(@Param("contactId") Long contactId, Pageable pageable);
    @Query("SELECT n FROM Note n WHERE n.activity.company.id = :companyId")
    
    Page<Note> findNotesByCompanyId(@Param("companyId") Long companyId, Pageable pageable);
   
   
   

}
  