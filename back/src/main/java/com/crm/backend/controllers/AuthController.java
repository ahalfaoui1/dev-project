package com.crm.backend.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.naming.AuthenticationException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.backend.exception.TokenRefreshException;
import com.crm.backend.models.RefreshToken;
import com.crm.backend.models.Role;
import com.crm.backend.models.User;
import com.crm.backend.payload.request.LoginRequest;
import com.crm.backend.payload.request.SignupRequest;
import com.crm.backend.payload.response.MessageResponse;
import com.crm.backend.payload.response.UserInfoResponse;
import com.crm.backend.repository.RoleRepository;
import com.crm.backend.repository.UserRepository;
import com.crm.backend.security.jwt.JwtUtils;
import com.crm.backend.security.services.RefreshTokenService;
import com.crm.backend.security.services.UserDetailsImpl;

//for Angular Client (withCredentials)
//@CrossOrigin(origins = "https://www.crm-decision.com", maxAge = 3600, allowCredentials="true")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  PasswordEncoder encoder;

  @Autowired
  JwtUtils jwtUtils;

  @Autowired
  RefreshTokenService refreshTokenService;


  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws AuthenticationException {
      try {
          Authentication authentication = authenticationManager.authenticate(
                  new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
          );

          SecurityContextHolder.getContext().setAuthentication(authentication);

          UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

          ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

          // Generate Refresh Token and its Cookie
          RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
          
          ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken());
          

         String token = jwtCookie.getValue();

          // Create UserInfoResponse with the JWT token
          UserInfoResponse userInfoResponse = new UserInfoResponse(
                  userDetails.getId(),
                  userDetails.getUsername(),
                  userDetails.getEmail(),
                  userDetails.getRole(),
                  token
          );

          // Build ResponseEntity with Cookies and UserInfoResponse
          HttpHeaders headers = new HttpHeaders();
          headers.add(HttpHeaders.SET_COOKIE, jwtCookie.toString());
          headers.add(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString());

          return ResponseEntity.ok()
                  .headers(headers)
                  .body(userInfoResponse);
      } catch (Exception e) {
          // Handle other exceptions
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Internal server error"));
      }
  }


  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
      if (userRepository.existsByUsername(signUpRequest.getUsername())) {
          return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
      }

      if (userRepository.existsByEmail(signUpRequest.getEmail())) {
          return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
      }

      // Create a new User entity from the SignUpRequest
      User user = new User(
          null, signUpRequest.getUsername(),
          signUpRequest.getEmail(),
        signUpRequest.getPassword(), null, null, null, null, null, null, null, null, null, null, false, null
      );

    

      userRepository.save(user);

      return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }


  @PostMapping("/signout")
  public ResponseEntity<?> logoutUser() {
    Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principle.toString() != "anonymousUser") {      
      Long userId = ((UserDetailsImpl) principle).getId();
      refreshTokenService.deleteByUserId(userId);
    }
    
    ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
    ResponseCookie jwtRefreshCookie = jwtUtils.getCleanJwtRefreshCookie();

    return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
        .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
        .body(new MessageResponse("You've been signed out!"));
  }

  @PostMapping("/refreshtoken")
  public ResponseEntity<?> refreshtoken(HttpServletRequest request) {
    String refreshToken = jwtUtils.getJwtRefreshFromCookies(request);
    
    if ((refreshToken != null) && (refreshToken.length() > 0)) {
      return refreshTokenService.findByToken(refreshToken)
          .map(refreshTokenService::verifyExpiration)
          .map(RefreshToken::getUser)
          .map(user -> {
            ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(user);
            System.out.println("refreshed    :");
            return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new MessageResponse("Token is refreshed successfully!"));
          })
          .orElseThrow(() -> new TokenRefreshException(refreshToken,
              "Refresh token is not in database!"));
    }
    
    return ResponseEntity.badRequest().body(new MessageResponse("Refresh Token is empty!"));
  }
}
