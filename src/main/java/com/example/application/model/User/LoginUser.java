package com.example.application.model.User;

import javax.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class LoginUser {

  private Integer id;
  private String firstname;
  private String lastname;
  private String email;
  @Builder.Default private Integer age = null;
  private String role;
  private String stringToken;

  public LoginUser() {}
}
