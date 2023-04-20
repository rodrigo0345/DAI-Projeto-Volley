package com.example.application.controller.Users;

import com.example.application.controller.Auth.Wrappers.AuthenticationRequest;
import com.example.application.controller.Auth.Wrappers.AuthenticationResponse;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.UserRepository;
import com.example.application.service.AuthenticationService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.ArrayList;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class UserController {
  private final UserRepository users;
  private final AuthenticationService service;

  public UserController(UserRepository users, AuthenticationService service) {
    this.users = users;
    this.service = service;
  }

  public @Nonnull Iterable<LoginUser> findAll() throws Exception {
    Iterable<User> usersAux = users.findAll();
    List<LoginUser> loginUserList = new ArrayList<>();
    for (User user : usersAux) {
      LoginUser aux = new LoginUser(user.getId(), user.getFirstname(), user.getLastname(),
          user.getEmail(), user.getRole().toString(), null);
      loginUserList.add(aux);
    }
    return loginUserList;
  }

  public LoginUser findById(Integer id) throws Exception {
    if (id == null)
      return null;
    User user = users.findById(id).get();
    LoginUser loginUser = new LoginUser(user.getId(), user.getFirstname(), user.getLastname(),
        user.getEmail(), user.getRole().toString(), null);
    return loginUser;
  }

  public LoginUser deleteUser(Integer id, LoginUser user) throws Exception {

    if (!user.getRole().equals("ADMIN")) {
      return null;
    }

    User dbUser = users.findById(id).get();
    LoginUser loginUser = new LoginUser(dbUser.getId(), dbUser.getFirstname(), dbUser.getLastname(),
        dbUser.getEmail(), dbUser.getRole().toString(), null);
    users.deleteById(id);
    return loginUser;
  }

}
