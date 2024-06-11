package com.crm.backend.payload.response;

import java.util.List;

import org.springframework.http.ResponseCookie;

import com.crm.backend.models.RefreshToken;
import com.crm.backend.models.*;

public class UserInfoResponse {
	private Long id;
	private String username;
	private String email;
	private Role roles;
	private String token;

	public UserInfoResponse(Long id, String username, String email, Role roles, String token) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.token = token;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}
	public String getToken() {
		return token;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public Role getRoles() {
		return roles;
	}
}
