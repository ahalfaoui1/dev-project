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
@Table(name = "CRM_comments")
public class Comment{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;
    

	private String description;

	@Column(name = "date_created")
	private Date dateCreated;


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_updated")
	private Date dateUpdated;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_deletedAt")
	private Date dateDeletedAt;
	
	


	   
	 
	   

}
