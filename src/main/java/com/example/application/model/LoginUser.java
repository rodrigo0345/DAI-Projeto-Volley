package com.example.application.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public
class LoginUser {

    @Id
    private String email;
    private String password;
}
