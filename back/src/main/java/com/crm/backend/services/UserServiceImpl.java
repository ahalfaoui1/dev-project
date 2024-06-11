package com.crm.backend.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.crm.backend.models.User;
import com.crm.backend.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    @Override
    public User createUser(User user) {
        // Add business logic/validation if needed
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        User existingUser = getUserById(id);

        if (existingUser != null) {
            // Update the fields you want to allow modification
            existingUser.setUsername(user.getUsername());
            existingUser.setFirstname(user.getFirstname());
            existingUser.setLastname(user.getLastname());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setRole(user.getRole()   );
            existingUser.setImage(user.getImage());
            existingUser.setEnabled(user.isEnabled());
            existingUser.setResetPasswordToken(user.getResetPasswordToken());

            return userRepository.save(existingUser);
        }

        return null; // or throw an exception if you prefer
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }


    @Override
    public Page<User> getAllUsersbyPage(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

	@Override
	public Page<User> getAllUserByPage(Pageable pageable) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<User> getUsersByRoleName(String roleName) {
		// TODO Auto-generated method stub
		return null;
	}

}
