package com.crm.backend.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.crm.backend.models.Activity;
import com.crm.backend.models.Contact;
import com.crm.backend.models.Note;
import com.crm.backend.repository.ActivityRepository;
import com.crm.backend.repository.CompanyRepository;
import com.crm.backend.repository.ContactRepository;
import com.crm.backend.repository.NoteRepository;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.persistence.EntityNotFoundException;



@Service
public class NoteService<NoteRequest> {
	
	    @Autowired
	    private NoteRepository noteRepository;

	    @Autowired
	    private ActivityRepository activityRepository;
	    
	    private final ContactRepository contactRepository;
	    
	    private final CompanyRepository companyRepository;


    NoteService(ContactRepository contactRepository, NoteRepository noteRepository, CompanyRepository companyRepository) {
        this.contactRepository = contactRepository;
        this.noteRepository = noteRepository;
        this.companyRepository = companyRepository;

    }
    

    public List<Note> getNotesByContactId(Long contactId) {
        Contact contact = contactRepository.findById(contactId).orElse(null);
        if (contact != null) {
            return contact.getActivities().stream()
                    .flatMap(activity -> activity.getNotes().stream())
                    .toList();
        }
        return null; 
    }

	    

	    public Note createNoteForActivity( Long ContactID,Note noteRequest ) {
	      
	        Activity a = new Activity();
	        a.setType("Notes");
	        a.setContact(contactRepository.findById(ContactID));
	        activityRepository.save(a);

	        
	        
	        Note note = new Note();
	        
	        note.setDateCreated(new Date());
            note.setDateUpdated(new Date());
            note.setDateDeletedAt(new Date());
            note.setDescription(noteRequest.getDescription());
            note.setActivity(activityRepository.findTopByOrderByIdDesc());
	        return noteRepository.save(note);
	    }
	    
	    
	    
	    public Note createNoteForActivityCompany( Long CompanyID,Note noteRequest ) {
		      
	        Activity a = new Activity();
	        a.setType("Notes");
	        a.setCompany(companyRepository.findById(CompanyID));
	        activityRepository.save(a);

	        
	        
	        Note note = new Note();
	        
	        note.setDateCreated(new Date());
            note.setDateUpdated(new Date());
            note.setDateDeletedAt(new Date());
            note.setDescription(noteRequest.getDescription());
            note.setActivity(activityRepository.findTopByOrderByIdDesc());
	        return noteRepository.save(note);
	    }
	    
	    
	    
	    
	    public void deleteNote(Long id) {
	        noteRepository.deleteById(id);
	        
	        System.out.println("le note est supprimer avec succes de le ID:"+id);
	    }
	    
	    public void deleteNotesByActivity(Long activityId) {
	        noteRepository.deleteAllByActivityId(activityId);
	        System.out.println("le note avec Avtivity est supprimer avec succes de le ID:"+activityId);

	        
	    }
	    
	    
	 
	}
