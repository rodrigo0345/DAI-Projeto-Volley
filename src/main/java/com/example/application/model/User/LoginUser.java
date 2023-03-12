package com.example.application.model.User;

import lombok.Data;
import lombok.AllArgsConstructor;

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