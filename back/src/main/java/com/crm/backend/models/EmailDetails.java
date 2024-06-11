package com.crm.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {

	// Class data members
	
	private String name;
	private String email;
	private String message;
	private String subject;
	private String attachment;
}
