package com.crm.backend.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;

import com.crm.backend.models.Contact;
import com.crm.backend.models.Note;
import com.crm.backend.models.Task;
import com.crm.backend.repository.ActivityRepository;
import com.crm.backend.repository.ContactRepository;
import com.crm.backend.services.TaskService;


@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/tasks")
public class TaskController {
	@Autowired
	 private final TaskService taskService;
	
	@Autowired
    private ActivityRepository activityRepository;
	 
	 public TaskController(TaskService task) {
		 this.taskService = task;
	 }

	  
 /*
	    @PostMapping("/{activityId}")
	    public ResponseEntity<Task> createTaskForActivity(@PathVariable Long activityId, @RequestBody Task task) {
	        Task createdTask = taskService.createTaskForActivity(activityId, task);
	       
	        return ResponseEntity.ok(createdTask);
	    }
	    
	  */
	 
	 
	 
	 
	    @PostMapping("/contact/details/{ContactID}")
	    public ResponseEntity<Task> createTaskForActivity(@PathVariable Long ContactID, @RequestBody Task task) {
	    	
	    	
	    	System.out.println("le id company "+ContactID);
	        Task createdTask = taskService.createTaskForActivity(ContactID, task);
	        
	       
	        return ResponseEntity.ok(createdTask);
	    }
	    
	    
	    @PostMapping("/entreprise/details/{CompanyID}")
	    public ResponseEntity<Task> createTaskForActivityCompany(@PathVariable Long CompanyID, @RequestBody Task task) {
	    	
	    	
	    	
	    	System.out.println("le id company "+CompanyID);
	        Task createdTask = taskService.createTaskForActivityCompany(CompanyID, task);
	        
	       
	        return ResponseEntity.ok(createdTask);
	    }
	    
	    
	    
	    
	 

}
