package com.example.application.model;

import com.example.application.model.Token.Token;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
public
class LoginUser {

    @Id
    private String firstname;
    private String lastname;
    private String email;
    private String role;
    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    public LoginUser() {
    }
}
