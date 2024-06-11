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
@Table(name = "CRM_emailsconfig")
public class Emailconfig{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emailconfig_id")
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "mailcontact_id", referencedColumnName = "contact_id")
    private Contact mailcontact;
    
    @ManyToOne
    @JoinColumn(name = "mailuser_id", referencedColumnName = "id")
    private User mailuser;
    
    private String	 host;
    private String	 port;
    private String	 username;
    private String	 password;
    
    private boolean  auth;
    private boolean	 enable;
    
    
    
    
}

