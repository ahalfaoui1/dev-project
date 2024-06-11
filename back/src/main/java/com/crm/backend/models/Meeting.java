package com.crm.backend.models;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_meetings")
public class Meeting{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meet_id")
    private Long id;
    private String title;
    private String place;	
	private Date meetingDate;
	private String description;
	
	// liste de personne
	private List<String> participants;
	
	 @Column(name = "date_created")
	private Date dateCreated;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_updated")
	private Date dateUpdated;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_deletedAt")
	private Date dateDeletedAt; 
	   @JsonIgnore
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
	    private Activity activity;
    
}