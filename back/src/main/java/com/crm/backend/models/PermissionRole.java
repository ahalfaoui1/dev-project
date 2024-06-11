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
@Table(name = "CRM_permission_role")
public class PermissionRole{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_role")
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "permissions_id")
    private Permissions permissions;
    
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

  
}