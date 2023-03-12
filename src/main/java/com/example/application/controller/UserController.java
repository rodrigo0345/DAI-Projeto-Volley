package com.example.application.controller;

import com.example.application.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.model.User.User;
import java.util.List;

import dev.hilla.Nonnull;

import dev.hilla.Endpoint;
import org.springframework.web.bind.annotation.GetMapping;

@Endpoint
@AnonymousAllowed
public class UserController {
    private final UserRepository users;

    public UserController(UserRepository users) {
        this.users = users;
    }

    public @Nonnull Iterable<User> findAll() {
        return users.findAll();
    }
}
