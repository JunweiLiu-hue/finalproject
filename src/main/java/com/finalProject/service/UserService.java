package com.finalProject.service;

import com.finalProject.model.User;
import com.finalProject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // User registration method
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            throw new RuntimeException("Password and confirm password do not match");
        }

//        String uuid = UUID.randomUUID().toString().replaceAll("[^0-9]", "");
//        String userId = uuid.length() >= 8 ? uuid.substring(0, 8) : uuid;
//        user.setUserId(userId);

        user.setConfirmPassword(null);

        return userRepository.save(user);
    }

    public User loginUser(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsernameAndPassword(username, password);

        if (!userOpt.isPresent()) {
            throw new RuntimeException("Invalid username or password");
        }

        return userOpt.get();
    }
}
