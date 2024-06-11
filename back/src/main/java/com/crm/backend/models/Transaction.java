package com.crm.backend.models;

import java.util.Date;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_Transactions")
public class Transaction {



	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Long id;
	
    @ManyToOne
    @JoinColumn(name = "contact_id")
    private Contact contact;
    
    @ManyToOne
    @JoinColumn(name = "entreprise_id")
    private Company entreprise;
    
    private String dateTransaction;
    private double montant;
    private String produitServiceAchete;
    
	    private String statut;

	public static Object builder() {
		// TODO Auto-generated method stub  
		return null;
	}
	
    
}