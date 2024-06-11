package com.crm.backend.models;

import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_CONTACTS")
public class Contact {


	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contact_id")
    private Long Id;
	
    
    
    @Column(name = "photo", length = Integer.MAX_VALUE, nullable = true)
    private byte[] photo;
    private String firstName;
    private String lastName;
    private String email;
    private String tel;
    private String companyName;
	private String source;
	private String adress;
    
    @Transient
    private String imageCode;
    
    @Transient
    private String search;
    private String type;
    private String linkedin;
	private String jobTitle;
    private String status;
	
	

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_created")
    private Date dateCreated;   
    
	
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_updated")
    private Date dateUpdated;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User contactOwner;
	
 
	@OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Activity> activities;

	
}