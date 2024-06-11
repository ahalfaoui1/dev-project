package com.crm.backend.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.crm.backend.models.*;

import com.crm.backend.repository.CompanyRepository;

public interface CompanyService {
	
	  

    List<Company> getAllCompany();

    Company getCompanyById(Long id);

    Company createCompany(Company Company);

    Company updateCompany(Long id, Company Company);

    void deleteCompany(Long id);
    
    Page<Company> getAllCompanyByPage(Pageable pageable);
    public Integer uploadCompany(MultipartFile file) throws IOException;
  
    public  void saveCompanyToDatabase(MultipartFile file);
    
    Page<Company> findByTypeCompany(Pageable pageable);     
    Page<Company> getPageCompanyByCustomFilter(Pageable pageable,String search,String activityArea,String typecontact) ;
    Page<Company> getPageCompanyByCustomFilterbyRole(Pageable pageable,String search,String activityArea,String typecontact, String role) ;

}



