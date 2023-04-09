package com.example.application.controller;

import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

@Endpoint
@AnonymousAllowed
public class UserController {
  private final UserRepository users;

  public UserController(UserRepository users) { this.users = users; }

  public @Nonnull Iterable<LoginUser> findAll() throws Exception {
    Iterable<User> usersAux = users.findAll();
    List<LoginUser> loginUserList = new ArrayList<>();
    for (User user : usersAux) {
      System.out.println(user);
      System.out.println(user.getTokens());
      LoginUser aux =
          new LoginUser(user.getId(), user.getFirstname(), user.getLastname(),
                        user.getEmail(), user.getRole().toString(), null);
      loginUserList.add(aux);
    }
    return loginUserList;
  }

  public LoginUser findById(Integer id) throws Exception {
    if (id == null)
      return null;
    User user = users.findById(id).get();
    LoginUser loginUser =
        new LoginUser(user.getId(), user.getFirstname(), user.getLastname(),
                      user.getEmail(), user.getRole().toString(), null);
    return loginUser;
  }

}
