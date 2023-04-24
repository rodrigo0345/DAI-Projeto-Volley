package com.example.application.service;

import com.example.application.controller.Users.UserController;
import org.springframework.http.ResponseEntity;

import com.example.application.model.User.LoginUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;

public class TokenService {

    @AnonymousAllowed
    public static ResponseEntity<Boolean> validateToken(LoginUser user, String token, AuthenticationService service) {
        return ResponseEntity.ok(service.isTokenValid(token, user.getEmail()));
    }
}