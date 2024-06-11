package com.crm.backend.services;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crm.backend.models.Activity;
import com.crm.backend.models.Contact;
import com.crm.backend.models.Note;
import com.crm.backend.models.Task;
import com.crm.backend.repository.ActivityRepository;
import com.crm.backend.repository.CompanyRepository;
import com.crm.backend.repository.ContactRepository;
import com.crm.backend.repository.NoteRepository;
import com.crm.backend.repository.TaskRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TaskService {
	
	 @Autowired
	 private TaskRepository taskRepository;
	 

	    @Autowired
	    private ActivityRepository activityRepository;
	    
	    
	    private final ContactRepository contactRepository;
	    
	    private final CompanyRepository companyRepository;
	    
	    
	    TaskService(ContactRepository contactRepository, TaskRepository taskRepository, CompanyRepository companyRepository) {
	        this.contactRepository = contactRepository;
	        this.taskRepository = taskRepository;
	        this.companyRepository = companyRepository;

	    }
	  

	    
/*
	    public Task createTaskForActivity(Long activityId, Task taskRequest) {
	        Activity activity = activityRepository.findById(activityId)
	            .orElseThrow(() -> new EntityNotFoundException("Activity not found"));
	        
	        	       
	        Task task = new Task();
	        
	        
	        task.setActivity(activity);
	        task.setDescription(taskRequest.getDescription());
	        
	        
	        return taskRepository.save(task);
	    }
	    
	    
	    */
	    
	    
	    
	    
	    
	    public Task createTaskForActivity(Long ContactID,Task task ) {
		      
	        Activity activity = new Activity();
	        activity.setType("Tasks");
	        activity.setContact(contactRepository.findById(ContactID));
	        activityRepository.save(activity);

	        
	        
	        Task tasks = new Task();
	        
	        tasks.setDateCreated(new Date());
	        tasks.setDateUpdated(new Date());
	        tasks.setDateDeletedAt(new Date());
	        tasks.setRminder(new Date());
	        
	        tasks.setQueue(task.getQueue());


	        tasks.setTitle(task.getTitle());
	        
	        tasks.setDescription(task.getDescription());
	        tasks.setActivity(activityRepository.findTopByOrderByIdDesc());
	        return taskRepository.save(tasks);
	    }
	    
	    
	    
	    
	    
	    public Task createTaskForActivityCompany( Long CompanyID,Task task ) {
		      
	        Activity a = new Activity();
	        a.setType("Tasks");
	        a.setCompany(companyRepository.findById(CompanyID));
	        activityRepository.save(a);

	        
	        
	        Task tasks = new Task();
	        
	        tasks.setDateCreated(new Date());
	        tasks.setDateUpdated(new Date());
	        tasks.setDateDeletedAt(new Date());
	        tasks.setRminder(new Date());
	        
	        tasks.setQueue(task.getQueue());


	        tasks.setTitle(task.getTitle());
	        
	        tasks.setDescription(task.getDescription());
	        tasks.setActivity(activityRepository.findTopByOrderByIdDesc());
	        return taskRepository.save(tasks);
	    }
	    
	    
	    
	    
	   


	    
	    
	

}
