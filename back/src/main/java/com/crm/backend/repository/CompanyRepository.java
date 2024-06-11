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


@CrossOrigin(origins = {"https://www.crm-decision.com", "http://localhost:4200", "http://212.132.104.88:4200", "http://crm.berneso.fr"}, maxAge = 3600, allowCredentials="true")
@RepositoryRestResource(collectionResourceRel = "companys", path = "companys")
@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> {
  
	 Page<Company> findAll(Pageable pageable);
	 @Query("SELECT c FROM Company c WHERE UPPER(c.name) LIKE %:search%  OR UPPER(c.activityArea) LIKE %:activityArea%  OR c.type = :type")
	 Page<Company> getPageCompanyByCustomFilter(
	     Pageable pageable,
	     @Param("search") String search,
	     @Param("activityArea") String activityArea,
	     @Param("type") String type
	 );
	 @Query("SELECT c FROM Company c WHERE ((UPPER(c.name) LIKE %:search%  OR UPPER(c.activityArea) LIKE %:activityArea%  OR c.type = :type) AND c.companyOwner.role.name = :role)")
	 Page<Company> getPageCompanyByCustomFilterbyrole(
	     Pageable pageable,
	     @Param("search") String search,
	     @Param("activityArea") String activityArea,
	     @Param("type") String type,
	     @Param("role") String role
	 );
	
}
   