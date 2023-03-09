package com.example.application.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import com.example.application.model.User;
import com.example.application.model.SecurityUser;
import com.example.application.repository.UserRepository;

@AnonymousAllowed
@Endpoint
public class AuthController {

    UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @AnonymousAllowed
    public User login(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (!password.equals(user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return user;
    }

    public String logout() {
        return "logout";
    }
}
