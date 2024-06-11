package com.crm.backend.models;

import java.util.Date;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_Activity")
public class Activity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private Long id;
    
	private String type;

  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id", referencedColumnName = "contact_id")
    private Contact contact;

  
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", referencedColumnName = "company_id")
    private Company company;
    
   
    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Note> notes;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Task> tasks;

    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Email> emails;
 
    
    @OneToMany(mappedBy = "activity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Meeting> meetings;


	

    public void setContact(Optional<Contact> contact) {
        this.contact = contact.orElse(null);
    }
    
    public void setCompany(Optional<Company> company) {
        this.company = company.orElse(null);
    }

    
   




}

