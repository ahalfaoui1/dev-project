package com.crm.backend.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import com.crm.backend.models.Email;
import com.crm.backend.models.Note;
import com.crm.backend.services.EmailService;

@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/emails")
public class EmailController {

	
	   @Autowired
	   private final EmailService emailService;

	    public EmailController(EmailService emailService) {
	        this.emailService = emailService;
	    }
	    
	    
	
	    
	    @PostMapping("/contact/details/{ContactID}")
	    public ResponseEntity<Email> createEmailForActivity(@PathVariable Long ContactID, @RequestBody Email email) {
	    	
	    	
	    	
	    	System.out.println("le id contact "+ContactID);
	        Email createdEmail = emailService.createEmailForActivity(ContactID, email);
	        
	       
	        return ResponseEntity.ok(createdEmail);
	    }
	    
	    
	    
	    
	    
	    @PostMapping("/entreprise/details/{CompanyID}")
	    public ResponseEntity<Email> createEmailForActivityCompany(@PathVariable Long CompanyID, @RequestBody Email email) {
	    	
	    	
	    	
	    	System.out.println("le id company "+CompanyID);
	        Email createdEmail = emailService.createEmailForActivityCompany(CompanyID, email);
	        
	       
	        return ResponseEntity.ok(createdEmail);
	    }
	    
	    
	    
	    @PutMapping("/update/{id}")
	    public ResponseEntity<Email> updateEmail(@PathVariable(value = "id") Long emailId,
	                                             @RequestBody Email emailDetails) {
	        Email updatedEmail = emailService.updateEmail(emailId, emailDetails);
	        return ResponseEntity.ok(updatedEmail);
	    }
	    
	    
	    
	    
	    /*

	    @PostMapping("/{activityId}")
	    public ResponseEntity<Email> createEmailForActivity(@PathVariable Long activityId, @RequestBody Email email) {
	        Email createdEmail = emailService.createEmailForActivity(activityId, email);
	       
	        return ResponseEntity.ok(createdEmail);
	    }
	    */
	    
}    
