package com.example.application.service;

import org.springframework.http.ResponseEntity;

import com.example.application.model.User.LoginUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;

public class TokenService {

    private AuthenticationService service;

    @AnonymousAllowed
    public ResponseEntity<Boolean> validateToken(LoginUser user, String token) {
        return ResponseEntity.ok(service.isTokenValid(token, user.getEmail()));
    }
}