package com.crm.backend.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.crm.backend.models.User;

public interface UserService {
	 
	List<User> getUsersByRoleName(String roleName);


    List<User> getAllUsers();

    User getUserById(Long id);

    User createUser(User User);

    User updateUser(Long id, User User);

    void deleteUser(Long id);
    Page<User> getAllUserByPage(Pageable pageable);
    
    Page getAllUsersbyPage(Pageable pageable);
}
