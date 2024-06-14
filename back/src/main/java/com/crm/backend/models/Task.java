package com.crm.backend.models;

import java.util.Date;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CRM_TASKS")
public class Task{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tasks_id")
    private Long Id;
    
    private String title;
    private String type;
    private String priorite;
    private String rappel;
    

    //date rappel  de expriration
    /*
    @Temporal(TemporalType.TIMESTAMP)
    */
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date expirationdate;
    

    
    //date rappel  de expriration
    /*
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    */
    @Temporal(TemporalType.TIMESTAMP)
    private Date rminder;
    
	
	private String description;
	
	private String queue;
	
	//Assigné cet tàche a un autre user/commercial
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User assignedTo;
	
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_created")
	private Date dateCreated;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_updated")
	private Date dateUpdated;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_deletedAt")
	private Date dateDeletedAt;
    
	   @JsonIgnore
	 @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id")
	    private Activity activity;
}