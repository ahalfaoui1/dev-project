package com.crm.backend.services;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.crm.backend.models.*;
import com.crm.backend.repository.ActivityRepository;
import com.crm.backend.repository.CompanyRepository;
import com.crm.backend.repository.ContactRepository;
import com.crm.backend.repository.EmailRepository;
import com.crm.backend.repository.TaskRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class EmailService {
	
	
	 @Autowired
	 private EmailRepository emailRepository;

	    @Autowired
	    private ActivityRepository activityRepository;
	    
	    private final ContactRepository contactRepository;
	    
	    private final CompanyRepository companyRepository;

	    
	    
	    EmailService(ContactRepository contactRepository, EmailRepository emailRepository, CompanyRepository companyRepository) {
	        this.contactRepository = contactRepository;
	        this.emailRepository = emailRepository;
	        this.companyRepository = companyRepository;
	    }
	    
	    
	    public Email createEmailForActivity(Long ContactID,Email email ) {
		      
	        Activity activity = new Activity();
	        activity.setType("Emails");
	        activity.setContact(contactRepository.findById(ContactID));
	        activityRepository.save(activity);

	        
	        
	        Email emails = new Email();
	        
	        emails.setDateCreated(new Date());
	        emails.setDateUpdated(new Date());
	        emails.setDateDeletedAt(new Date());
	        emails.setSendingDate(new Date());

	       
	        
	        emails.setDescription(email.getDescription());
	        emails.setRecipient(email.getRecipient());
	        emails.setSender(email.getSender());
	        emails.setSubject(email.getSubject());

	        emails.setActivity(activityRepository.findTopByOrderByIdDesc());
	        return emailRepository.save(emails);
	    }
	    
	    
	    
	    
	    public Email createEmailForActivityCompany( Long CompanyID,Email email ) {
		      
	        Activity a = new Activity();
	        a.setType("Emails");
	        a.setCompany(companyRepository.findById(CompanyID));
	        activityRepository.save(a);

	        
	        
  Email emails = new Email();
	        
	        emails.setDateCreated(new Date());
	        emails.setDateUpdated(new Date());
	        emails.setDateDeletedAt(new Date());
	        emails.setSendingDate(new Date());

	       
	        
	        emails.setDescription(email.getDescription());
	        emails.setRecipient(email.getRecipient());
	        emails.setSender(email.getSender());
	        emails.setSubject(email.getSubject());
	        emails.setActivity(activityRepository.findTopByOrderByIdDesc());
	        return emailRepository.save(emails);
	    }
	    
	    
	    
	    
	    public Email updateEmail(Long emailId, Email emailDetails) {
	        Email email = emailRepository.findById(emailId)
	                .orElseThrow(() -> new EntityNotFoundException("Email not found with id: " + emailId));

	        email.setRecipient(emailDetails.getRecipient());
	        email.setSender(emailDetails.getSender());
	        email.setSubject(emailDetails.getSubject());
	        email.setDescription(emailDetails.getDescription());
	        email.setSendingDate(emailDetails.getSendingDate());

	        // Set dateUpdated to current time
	        email.setDateUpdated(new Date());

	        return emailRepository.save(email);
	    }
	    

	    
	    /*
	    public Email createEmailForActivity(Long activityId, Email emailRequest) {
	        Activity activity = activityRepository.findById(activityId)
	            .orElseThrow(() -> new EntityNotFoundException("Activity not found"));

	        Email email = new Email();
	        
	        email.setActivity(activity);
	        email.setDescription(emailRequest.getDescription());
	        
	        return emailRepository.save(email);
	    }
	    */

	    
	    
	    
	    
	// Method
	// To send a simple email
//String sendSimpleMail(EmailDetails details);

	// Method
	// To send an email with attachment
//String sendMailWithAttachment(EmailDetails details);
}

