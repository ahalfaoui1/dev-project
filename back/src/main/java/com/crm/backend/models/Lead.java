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
@Table(name = "CRM_LEADS")
public class Lead {



	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lead_id")
    private Long id;
	
 
	   @ManyToOne
	    @JoinColumn(name = "contact_id")
	    private Contact contact;
	    
	    @ManyToOne
	    @JoinColumn(name = "entreprise_id")
	    private Entreprise entreprise;
	    
	    private String source;
	    private String statut;

	public static Object builder() {
		// TODO Auto-generated method stub  
		return null;
	}
	
    
}*/