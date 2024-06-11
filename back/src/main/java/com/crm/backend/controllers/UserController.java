package com.crm.backend.controllers;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.naming.AuthenticationException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.crm.backend.exception.TokenRefreshException;
import com.crm.backend.models.*;
import com.crm.backend.payload.request.LoginRequest;
import com.crm.backend.payload.request.SignupRequest;
import com.crm.backend.payload.response.MessageResponse;
import com.crm.backend.payload.response.UserInfoResponse;
import com.crm.backend.repository.RoleRepository;
import com.crm.backend.repository.UserRepository;
import com.crm.backend.security.jwt.JwtUtils;
import com.crm.backend.security.services.RefreshTokenService;
import com.crm.backend.security.services.UserDetailsImpl;
import com.crm.backend.services.*;

import ch.qos.logback.core.model.Model;

import com.crm.backend.services.*;

import jakarta.validation.Valid;
import java.util.List;

//for Angular Client (withCredentials)
//@CrossOrigin(origins = "https://www.crm-decision.com", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository UserRepository;
    private final RoleRepository RoleRepository;
    @Autowired
    public UserController( RoleRepository RoleRepository,UserService userService,UserRepository UserRepository) {
        this.userService = userService;
        this.RoleRepository = RoleRepository;
        this.UserRepository= UserRepository;
    }

    // Get all users
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @GetMapping("/pages")
    public ResponseEntity<Page<User>> getAllUserPage(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {

        try {
            Pageable  pageable = PageRequest.of(page, size);

            Page<User> userpage = UserRepository.findAll(pageable);
            System.out.println(userpage);
            return ResponseEntity.ok(userpage);
        } catch (Exception e) {
            // Handle exceptions if necessary
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get user by ID
    @GetMapping("/getbyid/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // Create new user
    @PostMapping("/add")
    public ResponseEntity<?> createUser(@RequestBody User user
    )  {
     
    	try {
        Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      
      //  Lead leads = new Lead();
		    if(user.getImageDecode()==""){
		    	user.setImage(null);
		    }else {
		    	 byte[] photoBytes = Base64.getDecoder().decode(user.getImageDecode());
		    	 user.setImage(photoBytes);
		    }
		    	if (user.getRoles().equals("1")) {
				user.setRole( RoleRepository.findById(1L).get());
				}else if (user.getRoles().equals("2")) {
				user.setRole(RoleRepository.findById(2L).get());
				}else if (user.getRoles().equals("3")) {
				user.setRole(RoleRepository.findById(3L).get());
				}else if (user.getRoles().equals("4")) {
				user.setRole(RoleRepository.findById(4L).get());
				}
          
		    user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setDateCreated(new Date());
            user.setEnabled(true);
            user.setDateUpdated(new Date());
            
            System.out.println("photo    :"+  user.toString());
    	    System.out.println("photo    :"+  user.getImage());
            
    	    UserRepository.save(user);
    	
    	     return ResponseEntity.ok(user);
        } catch (Exception e) {
            // Handle exceptions if necessary
        	  System.out.println("hoooooooooooooooooooooo    :");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Update existing user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    // Delete user by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    
    @PostMapping("/changepassword")
    public ResponseEntity<?> editPassword(@RequestBody User user) {
        try {
            User userEdit = userService.getUserById(user.getId());
            userEdit.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            UserRepository.save(userEdit);
            return ResponseEntity.ok(userEdit);
        } catch (Exception e) {
            e.printStackTrace(); // Optionally print the stack trace for debugging purposes
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la mise à jour du mot de passe.");
        }
    }
    
    @PostMapping("/verifpassword")
    public ResponseEntity<?>  verifpassword(@RequestBody User user) {
   		try {
   	
   	    User useredit = userService.getUserById(user.getId());   	   
   	    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();  // Create an instance

   	    boolean isPasswordCorrect = passwordEncoder.matches(user.getCurrentpassword(), useredit.getPassword());
   	    System.out.print(isPasswordCorrect);
   	  	return ResponseEntity.ok(isPasswordCorrect);
   	   
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
	}
    @PostMapping("/configmail")
    public ResponseEntity<?>  configmail(@RequestBody User user) {
   		try {
   	
   	 System.out.print("ok");
   	  	return ResponseEntity.ok("ok");
   	   
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
	}
    
    @PostMapping("/changeimage")
    public ResponseEntity<?> changephotouser(@RequestBody User user) {
    	try {
    		 System.out.print(user);
    	  User useredit = userService.getUserById(user.getId());
    	  
		  if(user.getImageDecode()==""){
			  useredit.setImage(null);
			 
		    }else {
		    	 byte[] photoBytes = Base64.getDecoder().decode(user.getImageDecode());
		    	 useredit.setImage(photoBytes);
		    	
		    }
		  useredit.setDateCreated(new Date());
		  useredit.setDateUpdated(new Date());
		 
		UserRepository.save(useredit);
		
	     return ResponseEntity.ok(useredit);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
	}
    
    
    @GetMapping("/by-role/commercial")
    public List<User> getUsersWithCommercialRole() {
        return userService.getUsersByRoleName("COMMERCIAL");
    }
	
	
}
