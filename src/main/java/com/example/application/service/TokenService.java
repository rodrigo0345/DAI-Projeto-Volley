package com.example.application.service;

import com.example.application.controller.Users.UserController;
import com.example.application.model.User.LoginUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.springframework.http.ResponseEntity;

public class TokenService {

  @AnonymousAllowed
  public static boolean validateToken(LoginUser user, String token,
                                      AuthenticationService service) {
    return service.isTokenValid(token, user.getEmail());
  }
}