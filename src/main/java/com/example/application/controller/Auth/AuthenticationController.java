package com.example.application.controller.Auth;

import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.service.AuthenticationService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.repository.UserRepository;
import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserRepository users;

    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) {
        if (users.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(service.register(request));
    }

    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) throws Exception {
        return ResponseEntity.ok(service.authenticate(request));
    }

}