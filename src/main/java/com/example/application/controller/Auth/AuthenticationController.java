package com.example.application.controller.Auth;

import lombok.RequiredArgsConstructor;

import javax.persistence.Entity;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.application.service.AuthenticationService;
import com.example.application.service.JwtService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
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

    public LoginUser login(String email, String password) throws Exception {

        User user = null;
        try {
            user = users.findByEmail(email).get();
        } catch (Exception e) {
            System.err.println(e);
        }

        if (user == null) {
            return null;
        }

        RegisterRequest request = new RegisterRequest(user.getFirstname(), user.getLastname(), user.getUsername(),
                user.getEmail(),
                user.getPassword(), user.getRole().toString());

        AuthenticationRequest authRequest = new AuthenticationRequest(user.getEmail(), user.getPassword());

        // regista uma nova token
        AuthenticationResponse token = null;
        try {
            token = service.authenticate(authRequest);
        } catch (Exception e) {
            token = service.register(request);
        }

        System.err.println(token.getToken());

        LoginUser loginUser = new LoginUser(
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getRole().toString(),
                token.getToken());

        return loginUser;
    }

    public ResponseEntity<Boolean> validateToken(LoginUser user, String token) {
        return ResponseEntity.ok(service.isTokenValid(token, user.getFirstname()));
    }

}
