package com.crm.backend.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestBody;

import com.crm.backend.models.Company;
import com.crm.backend.models.Note;
import com.crm.backend.services.NoteService;

 


@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RestController
@RequestMapping("/notes")
public class NoteController  {
	
	   private final NoteService noteService;

	    public NoteController(NoteService noteService) {
	        this.noteService = noteService;
	    }

	    @PostMapping("/contact/details/{ContactID}")
	    public ResponseEntity<Note> createNoteForActivity(@PathVariable Long ContactID, @RequestBody Note note) {
	    	
	    	
	    	
	    	System.out.println("le id contact "+ContactID);
	        Note createdNote = noteService.createNoteForActivity(ContactID, note);
	        
	       
	        return ResponseEntity.ok(createdNote);
	    }
	    
	    
	    
	    // Delete user by ID
	    @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
	        noteService.deleteNote(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
	    
	    @DeleteMapping("/activity/{activityId}")
	    public ResponseEntity<String> deleteNotesByActivity(@PathVariable Long activityId) {
	        noteService.deleteNotesByActivity(activityId);
	        return ResponseEntity.ok("All notes related to activity with ID " + activityId + " deleted successfully");
	    }
	    
	    
	    @PostMapping("/entreprise/details/{CompanyID}")
	    public ResponseEntity<Note> createNoteForActivityCompany(@PathVariable Long CompanyID, @RequestBody Note note) {
	    	
	    	
	    	
	    	System.out.println("le id company "+CompanyID);
	        Note createdNote = noteService.createNoteForActivityCompany(CompanyID, note);
	        
	       
	        return ResponseEntity.ok(createdNote);
	    }
	    
	    
	    
	    
	    
	    
	    @GetMapping("/contact/{contactId}")
	    public ResponseEntity<List<Note>> getNotesByContactId(@PathVariable Long contactId) {
	        List<Note> notes = noteService.getNotesByContactId(contactId);
	        if (notes != null) {
	            return new ResponseEntity<>(notes, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	    

}
	


