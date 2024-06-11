package com.crm.backend.models;

import java.util.Date;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import jakarta.persistence.*;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContactDTO {


    
   
    private String photo;
    private String nom;
    private String prenom;
    private String email;
    private String tel;
  
    private String linkedin;
	private String intitulePoste;
    private String phaseCycleVie;
	private String statusLead;
	private String typecontact;
 
}