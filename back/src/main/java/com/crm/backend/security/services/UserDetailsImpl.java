package com.crm.backend.security.services;


import java.util.*;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.crm.backend.models.Role;
import com.crm.backend.models.User;



public class UserDetailsImpl implements UserDetails {

	private User user;
	
	public UserDetailsImpl(User user) {
		this.user = user;
	}
	 public Collection<? extends GrantedAuthority> getAuthorities() {
	       Role roles = user.getRole();
	        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
 authorities.add(new SimpleGrantedAuthority(roles.getName()));
	      
	         
	        return authorities;
	    }

	 
	 public Long getId() {
			return user.getId();
	}
	 public String getEmail() {
			return user.getEmail();
	}
	 public Role getRole() {
			return user.getRole();
	}
	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return user.isEnabled();
	}

}