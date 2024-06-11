package com.crm.backend.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.naming.AuthenticationException;

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


import com.crm.backend.models.*;

import com.crm.backend.repository.*;


import com.crm.backend.security.services.UserDetailsImpl;

import com.crm.backend.services.*;






//for Angular Company (withCredentials)

//@CrossOrigin(origins = "https://www.crm-decision.com", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")

//@CrossOrigin(origins = "*", maxAge = 3600)
//@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/companys")
public class CompanyController {

	 private final UserService userService;
    
  
    private final CompanyRepository CompanyRepository;
    
    private final CompanyService CompanyService;

    @Autowired
    public CompanyController(UserService userService,CompanyService CompanyService, CompanyRepository CompanyRepository) {
        this.CompanyService = CompanyService;
        this.CompanyRepository = CompanyRepository;
        this.userService = userService;
    }

    
    public Page<Company> getAllCompanyByPage(Pageable pageable) {
        return CompanyRepository.findAll(pageable);
    }
  

    @GetMapping("/pages")
    public ResponseEntity<Page<Company>> getAllCompanyPage(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "search" , defaultValue = "") String search,
            @RequestParam(name = "secteuractivity", defaultValue = "") String secteuractivity,
            @RequestParam(name = "type", defaultValue = "") String type
    
        ) {
        try {
        	Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        	Object pricipal = auth.getPrincipal();
        	String role="";
        	if (pricipal instanceof UserDetailsImpl) {
        	       role = ((UserDetailsImpl) pricipal).getRole().getName();
        	      
        	}
        	  System.out.println("userDetails"+role);
        	 Pageable pageable = PageRequest.of(page, size);
           
            Page<Company> CompanyPage = CompanyService.getPageCompanyByCustomFilterbyRole(pageable,search,secteuractivity,type,role);
            return ResponseEntity.ok(CompanyPage);
        } catch (Exception e) {
            // Handle exceptions appropriately (consider logging or specific error responses)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    



    // Get all Company
    @GetMapping("/all")
    public ResponseEntity<List<Company>> getAllCompany() {
        List<Company> Company = CompanyService.getAllCompany();
        return new ResponseEntity<>(Company, HttpStatus.OK);
    }

    // Get contact by ID
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        Company contact = CompanyService.getCompanyById(id);
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }

    // Create new contact
    @PostMapping("/add")
    public ResponseEntity<?> createLead(@RequestBody Company Company
    )  {
     
    	try {
        Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      
      //  Lead leads = new Lead();
		    if(Company.getImageCode()==""){
		    	Company.setPhoto(null);
		    }else {
		    	 byte[] photoBytes = Base64.getDecoder().decode(Company.getImageCode());
		    	 Company.setPhoto(photoBytes);
		    }
          
		    Company.setCompanyOwner(userService.getUserById(1L));
		    Company.setDateCreated(new Date());
		    Company.setDateUpdated(new Date());
            
            System.out.println("photo    :"+  Company.toString());
    	    System.out.println("photo    :"+  Company.getPhoto());
            
    	    CompanyRepository.save(Company);
    	
    	     return ResponseEntity.ok(Company);
        } catch (Exception e) {
            // Handle exceptions if necessary
        	  System.out.println("hoooooooooooooooooooooo    :");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/uploadCompanys")
    public ResponseEntity<?> uploadCustomersData(@RequestParam("file")MultipartFile file) throws IOException{
 	   String message = "";
 	
 	   try {
 		  CompanyService.saveCompanyToDatabase(file);
 		   message = "Companys data uploaded and saved to database successfully " + file.getOriginalFilename();
 		   return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
 	   } catch (Exception e) {
 	    	
 	          message = "Could not upload the file: " + file.getOriginalFilename() + "!";
 	          return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
 	   }
 	
 	 
    }

    // Update existing contact
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long id, @RequestBody Company Company) {
        Company updatedContact = CompanyService.updateCompany(id, Company);
        return new ResponseEntity<>(updatedContact, HttpStatus.OK);
    }
    @PostMapping("/changeimage")
    public ResponseEntity<?> changephotouser(@RequestBody Company Company) {
    	try {
    		 System.out.print(Company);
    		 Company Companyedit = CompanyService.getCompanyById(Company.getId());
    	  
		  if(Company.getImageCode()==""){
			  Companyedit.setPhoto(null);
			 
		    }else {
		    	 byte[] photoBytes = Base64.getDecoder().decode(Company.getImageCode());
		    	 Companyedit.setPhoto(photoBytes);
		    	
		    }
		  Companyedit.setDateCreated(new Date());
		  Companyedit.setDateUpdated(new Date());
		 
		CompanyRepository.save(Companyedit);
		
	     return ResponseEntity.ok(Companyedit);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
	}

    // Delete contact by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        CompanyService.deleteCompany(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}