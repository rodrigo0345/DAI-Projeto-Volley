package com.example.application.model.User;

import lombok.Data;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
public class LoginUser {

    private String firstname;
    private String lastname;
    private String email;
    private String role;
    private String stringToken;

    public LoginUser() {
    }
}