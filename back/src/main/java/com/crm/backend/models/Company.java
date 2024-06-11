package com.crm.backend.models;

import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_Company")
public class Company{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long id;
    
    @Column(name = "photo", length = Integer.MAX_VALUE, nullable = true)
    private byte[] photo;
    

    private String name;
    private String email;
    private String tel;
    private String type;
    private String status;
   
    
      
    private String adress;
    private String city;
    private String zipcode;

    private String country;
    private String timezone;
   
	private String activityArea; 

	private String employeeNb;
	private String description;
	
	 private String webSite;
	 private String linkedin;
	 private String instagram;
	 private String facebook;
	 

	    
	@Transient
	private String imageCode;
	
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_created")
    private Date dateCreated;
    
	
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_updated")
    private Date dateUpdated;
	
	
	
    @ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User companyOwner;										
    
    
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Activity> activities;

	
	
    
}