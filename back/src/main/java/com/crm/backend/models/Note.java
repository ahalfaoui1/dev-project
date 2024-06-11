package com.crm.backend.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_notes")
public class Note{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    private Long Id;
   
	private String description;
    
    

	@Column(name = "date_created")
	private Date dateCreated;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_updated")
	private Date dateUpdated;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_deletedAt")
	private Date dateDeletedAt;
	
	
	

    
	
	 @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
	    private Activity activity;
  
	
	   
	   
	    
}


