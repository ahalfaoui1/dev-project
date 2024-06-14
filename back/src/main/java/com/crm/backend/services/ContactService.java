package com.crm.backend.services;

import java.io.IOException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.crm.backend.models.*;

import com.crm.backend.repository.ContactRepository;
import java.util.Date;
import java.util.Calendar;




public interface ContactService {
	
	/*
    @Autowired
    private  ContactRepository contactRepository;

    public List<Contact> findContactsWithActivities() {
        return contactRepository.findContactsWithActivities();
    }
	 */
	
	
	   
	  

    List<Contact> getAllContact();

    Contact getContactById(Long id);

    Contact createContact(Contact Contact);

    Contact updateContact(Long id, Contact Contact);

    void deleteContact(Long id);
    
    Page<Contact> getAllContactByPage(Pageable pageable);
    Page<Contact> getPageContactByCustomFilter(Pageable pageable,String search,String type,String status) ;
    Page<Contact> getPageContactByCustomFilterbyRole(Pageable pageable,String search,String status,String type,String role) ;

    Page<Contact> getAllContactByPage(Pageable pageable,String name);

    //Page<Contact> findByTypeContact(Pageable pageable);     
    public Integer uploadContact(MultipartFile file) throws IOException;
    
    public  void saveContactToDatabase(MultipartFile file);
    


  
}



