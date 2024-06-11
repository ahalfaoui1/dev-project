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
@RepositoryRestResource(collectionResourceRel = "activities", path = "activities")
@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long> {
  
	 Page<Activity> findAll(Pageable pageable);
	 
	 Activity findTopByOrderByIdDesc();
	 

}



