package com.crm.backend.controllers;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import javax.naming.AuthenticationException;
import javax.print.DocFlavor.URL;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import com.crm.backend.exception.*;
import com.crm.backend.models.*;
import com.crm.backend.payload.request.*;

import com.crm.backend.payload.response.MessageResponse;
import com.crm.backend.payload.response.UserInfoResponse;
import com.crm.backend.repository.*;

import com.crm.backend.security.jwt.JwtUtils;
import com.crm.backend.security.services.RefreshTokenService;
import com.crm.backend.security.services.UserDetailsImpl;
import com.crm.backend.services.ContactServiceImpl;
import com.crm.backend.services.*;
import com.crm.backend.services.UserService;

import org.springframework.util.StringUtils;



//for Angular Client (withCredentials)
//@CrossOrigin(origins = "https://www.crm-decision.com", maxAge = 3600, allowCredentials="true")


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/contacts")
public class ContactController {

	 private final UserService userService;
    
  
    private final ContactRepository contactRepository;
    
    private final ContactService contactService;

    @Autowired
    public ContactController(UserService userService,ContactService contactService, ContactRepository contactRepository) {
        this.contactService = contactService;
        this.contactRepository = contactRepository;
        this.userService = userService;
    }

    
    public Page<Contact> getAllcontactByPage(Pageable pageable) {
        return contactRepository.findAll(pageable);
    }
  

    /*@GetMapping("/pages")
    public ResponseEntity<Page<contact>> getAllcontactPage(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size
            @RequestParam(name = "size", defaultValue = "10") int size
            
    		) {

        try {
            Pageable  pageable = PageRequest.of(page, size);
            Page<contact> contactPage = contactService.getAllcontactByPage(pageable);
            return ResponseEntity.ok(contactPage);
        } catch (Exception e) {
            // Handle exceptions if necessary
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }*/
    @GetMapping("/pages")
    public ResponseEntity<Page<Contact>> getAllcontactPage(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "Search" , defaultValue = "") String search,
            @RequestParam(name = "Status", defaultValue = "") String status,
            @RequestParam(name = "Type", defaultValue = "") String type
    
        ) {
        try {
        	//System.err.println("thiiiiiis"+status);
        	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        	Object pricipal = auth.getPrincipal();
        	String role="";
        	if (pricipal instanceof UserDetailsImpl) {
        	       role = ((UserDetailsImpl) pricipal).getRole().getName();
        	      
        	}
        	  System.out.println("userDetails"+role);
        	 Pageable pageable = PageRequest.of(page, size);

                Page<Contact> contactPage = contactService.getPageContactByCustomFilterbyRole(pageable,search,status,type,role);
               
                
                return ResponseEntity.ok(contactPage);
        	//}
        	   

  
           
         
         
        } catch (Exception e) {
            // Handle exceptions appropriately (consider logging or specific error responses)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
 
  
   @PostMapping("/uploadcontacts")
   public ResponseEntity<?> uploadCustomersData(@RequestParam("file")MultipartFile file) throws IOException{
	   String message = "";
	   try {
		   contactService.saveContactToDatabase(file);
		   message = "contacts data uploaded and saved to database successfully " + file.getOriginalFilename();
		   return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
	   } catch (Exception e) {
	    	
	          message = "Could not upload the file: " + file.getOriginalFilename() + "!";
	          return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
	   }
	
	 
   }
 

  

    @PostMapping("/changeimage")
    public ResponseEntity<?> changephotouser(@RequestBody Contact contact) {
    	try {
    		 System.out.print(contact);
    		 Contact contactedit = contactService.getContactById(contact.getId());
    	  
		  if(contact.getImageCode()==""){
			  contactedit.setPhoto(null);
			 
		    }else {
		    	 byte[] photoBytes = Base64.getDecoder().decode(contact.getImageCode());
		    	 contactedit.setPhoto(photoBytes);
		    	
		    }
		  contactedit.setDateCreated(new Date());
		  contactedit.setDateUpdated(new Date());
		 
		contactRepository.save(contactedit);
		
	     return ResponseEntity.ok(contactedit);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
	}
   




    // Get all contact
    @GetMapping("/all")
    public ResponseEntity<List<Contact>> getAllcontact() {
        List<Contact> contact = contactService.getAllContact();
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }


    // Get user by ID
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<Contact> getcontactById(@PathVariable Long id) {
    	Contact contact = contactService.getContactById(id);
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }
 

    // Create new contact
    @PostMapping("/add")
    public ResponseEntity<?> createcontact(@RequestBody Contact contact
    )  {
     
    	try {
        Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      
      //  contact contacts = new contact();
		    if(contact.getImageCode()==""){
		    	  contact.setPhoto(null);
		    }else {
		    	 byte[] photoBytes = Base64.getDecoder().decode(contact.getImageCode());
		         contact.setPhoto(photoBytes);
		    }


      //    System.err.println(userService.getUserById(1L));
            contact.setContactOwner(userService.getUserById(1L));
            contact.setDateCreated(new Date());
            contact.setDateUpdated(new Date());
            
            System.out.println("photo    :"+  contact.toString());
    	    System.out.println("photo    :"+  contact.getPhoto());
            
    	    contactRepository.save(contact);
    	
    	     return ResponseEntity.ok(contact);
        } catch (Exception e) {
      
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update existing contact
    @PutMapping("/update/{id}")
    public ResponseEntity<Contact> updatecontact(@PathVariable Long id, @RequestBody Contact contact) {
        Contact updatedContact = contactService.updateContact(id, contact);
        return new ResponseEntity<>(updatedContact, HttpStatus.OK);
    }

    // Delete contact by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletecontact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/new")
    public List<Contact> getNewContacts() {
        return contactRepository.findByStatus("New");
    }
    
    
    
  
  
}