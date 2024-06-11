package com.crm.backend.models;

import java.util.Date;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_emails")

public class Email{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_id")
    private Long id;
    
	private String recipient; 
	private String sender;
	private String subject;
	private String description;	
	private Date sendingDate;


	@Column(name = "date_created")
	private Date dateCreated;


@Temporal(TemporalType.TIMESTAMP)
@Column(name = "date_updated")
private Date dateUpdated;

@JsonIgnore
@Temporal(TemporalType.TIMESTAMP)
@Column(name = "date_deletedAt")
private Date dateDeletedAt; 
	

	
	
     @ManyToOne(fetch = FetchType.LAZY)
     @JsonIgnore
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
    private Activity activity;
}