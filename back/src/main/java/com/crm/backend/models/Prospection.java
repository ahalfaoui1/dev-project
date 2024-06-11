/*package com.crm.backend.models;

import java.util.Date;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_PROSPECTIONS")
public class Prospection {



	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prospect_id")
    private Long id;
	
 
	    @ManyToOne
	    @JoinColumn(name = "contact_id")
	    private Contact contact;
	    
	    @ManyToOne
	    @JoinColumn(name = "entreprise_id")
	    private Entreprise entreprise;
	    
	    
	    @Temporal(TemporalType.TIMESTAMP)
	    @Column(name = "dateprospection")
	    private Date dateProspection;
	    

	    private String moyenContact;
	    private String statut;

	public static Object builder() {
		// TODO Auto-generated method stub  
		return null;
	}
	
    
}*/