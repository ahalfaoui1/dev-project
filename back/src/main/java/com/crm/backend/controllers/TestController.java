package com.crm.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//@CrossOrigin(origins = "https://www.crm-decision.com", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")

@RestController
@RequestMapping("/api/test")
public class TestController {


	// ...

	private static final Logger logger = LoggerFactory.getLogger(TestController.class);

  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping("/mod")
 @PreAuthorize("hasRole('MODERATOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  //@PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<String> adminAccess() {
      logger.info("Received request to /admin");
      // Your existing logic
      return ResponseEntity.ok("Admin Board.");
  }

}
