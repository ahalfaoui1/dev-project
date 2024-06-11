package com.crm.backend.repository;

import java.sql.Date;
import java.util.List;

import java.util.Optional;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.crm.backend.models.*;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RepositoryRestResource(collectionResourceRel = "tasks", path = "tasks")
@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
  
	 Page<Task> findAll(Pageable pageable);
	 
	    List<Task> findByActivity_Contact_Id(@Param("contactId") Long contactId);
	    
	    /// Page<Note> findByActivity_Contact_Id(@Param("contactId") Long contactId, Pageable pageable);
	     @Query("SELECT t FROM Task t WHERE t.activity.contact.id = :contactId")
	     Page<Task> findTaskByContactId(@Param("contactId") Long contactId, Pageable pageable);
	     @Query("SELECT n FROM Task n WHERE n.activity.company.id = :companyId")
	     Page<Task> findTaskByCompanyId(@Param("companyId") Long companyId, Pageable pageable);
	     

       
	     @Query("SELECT t FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.Id = :contactId AND t.rminder = :currentDate")
	     List<Task> findTasksByContactIdAndRminderEqualsCurrentDate(Long contactId, Date currentDate);
	     
	     
	     @Query("SELECT t FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.Id = :contactId AND t.rminder < :currentDate")
	     List<Task> findTasksByContactIdAndRminderBeforeCurrentDate(Long contactId, Date currentDate);
	     
	     @Query("SELECT t FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.Id = :contactId AND t.rminder > :currentDate")
	     List<Task> findTasksByContactIdAndRminderAfterCurrentDate(Long contactId, Date currentDate);
	    
	     

		    /// ----------------GET LES TASK WHERE DATE D'EXPIRATION------------------------
	     @Query("SELECT t FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.Id = :contactId AND t.expirationdate < :currentDate")
	     List<Task> findTasksByContactIdAndExpirationdateBeforeCurrentDate(Long contactId, Date currentDate);
	     
	     @Query("SELECT t FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.Id = :contactId AND t.expirationdate > :currentDate")
	     List<Task> findTasksByContactIdAndExpirationdateAfterCurrentDate(Long contactId, Date currentDate);
	    
	                                   /*Count nombre de task avait type A faire*/ 
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate = :currentDate AND t.type = 'A faire'")
	     Long countTasksByContactIdAndExpirationdateEqualCurrentDateAndTypeIsToDo(Long contactId, Date currentDate);
	     
	     
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate < :currentDate AND t.type = 'A faire'")
	     Long countTasksByContactIdAndExpirationdateBeforeCurrentDateAndTypeIsToDo(Long contactId, Date currentDate);
	     
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate > :currentDate AND t.type = 'A faire'")
	     Long countTasksByContactIdAndExpirationdateAfterCurrentDateAndTypeIsToDo(Long contactId, Date currentDate);
	     
	                                 /*Count nombre de task avait type Appel*/
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate = :currentDate AND t.type = 'Appel'")
	     Long countTasksByContactIdAndExpirationdateEqualCurrentDateAndTypeIsToDoA(Long contactId, Date currentDate);
	     
	     
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate < :currentDate AND t.type = 'Appel'")
	     Long countTasksByContactIdAndExpirationdateBeforeCurrentDateAndTypeIsToDoA(Long contactId, Date currentDate);
	     
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate > :currentDate AND t.type = 'Appel'")
	     Long countTasksByContactIdAndExpirationdateAfterCurrentDateAndTypeIsToDoA(Long contactId, Date currentDate);
	     
	                                  /*Count nombre de task avait type EMAIL*/
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate = :currentDate AND t.type = 'E-mail'")
	     Long countTasksByContactIdAndExpirationdateEqualCurrentDateAndTypeIsToDoE(Long contactId, Date currentDate);
	     
	     
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate < :currentDate AND t.type = 'E-mail'")
	     Long countTasksByContactIdAndExpirationdateBeforeCurrentDateAndTypeIsToDoE(Long contactId, Date currentDate);
	     
	     @Query("SELECT COUNT(t) FROM Task t JOIN t.activity a JOIN a.contact c WHERE c.id = :contactId AND t.expirationdate > :currentDate AND t.type = 'E-mail'")
	     Long countTasksByContactIdAndExpirationdateAfterCurrentDateAndTypeIsToDoE(Long contactId, Date currentDate);
	     
}
