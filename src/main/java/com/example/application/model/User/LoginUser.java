package com.example.application.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginUser {

  private Integer id;
  private String firstname;
  private String lastname;
  private String email;
  private String role;
  private String stringToken;

  public LoginUser() {}
}
