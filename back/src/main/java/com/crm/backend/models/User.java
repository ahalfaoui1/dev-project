package com.crm.backend.models;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.crm.backend.models.Role;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "CRM_USERS",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "username"),
           @UniqueConstraint(columnNames = "email")
       })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;
  private String firstname;
  private String lastname;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;
  
  @NotFound(action = NotFoundAction.IGNORE)
  @ManyToOne(fetch = FetchType.LAZY, optional = true)
  @JoinColumn(name = "role_id", referencedColumnName = "role_id")
  private Role role;

  
@Column(name = "image", length = Integer.MAX_VALUE, nullable = true)
private byte[] image;

@Transient
private String imageDecode;
@Transient
private String currentpassword;
@Transient   
private String roles;
@Temporal(TemporalType.TIMESTAMP)
@Column(name = "date_created")
private Date dateCreated;


@Temporal(TemporalType.TIMESTAMP)
@Column(name = "date_updated")
private Date dateUpdated;

private String tel;

private boolean enabled;

@Column(name = "reset_password_token")
private String resetPasswordToken;



}
