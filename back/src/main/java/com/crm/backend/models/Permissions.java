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
@Table(name = "CRM_permissions")
public class Permissions{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permissions_id")
    private Long id;
	private String name;
	private String label;
	private String description;
	private Date createdAt;
	private Date updatedAt;
	private Date deletedAt;
	
	
    @OneToMany(mappedBy = "permissions")
    private Set<PermissionRole> permissionRoles = new HashSet<>();
	//@JsonIgnore
	//private Set<PermissionRole> permissionRoles = new HashSet<PermissionRole>(0);   
}