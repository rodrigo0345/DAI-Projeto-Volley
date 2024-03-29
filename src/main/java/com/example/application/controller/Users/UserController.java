package com.example.application.controller.Users;

import com.example.application.controller.Auth.Wrappers.AuthenticationRequest;
import com.example.application.controller.Auth.Wrappers.AuthenticationResponse;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.UserRepository;
import com.example.application.security.CryptWithMD5;
import com.example.application.service.AuthenticationService;
import com.example.application.service.TokenService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;

@Endpoint
@AnonymousAllowed
public class UserController {
  private final UserRepository users;
  private final AuthenticationService service;

  public UserController(UserRepository users, AuthenticationService service) {
    this.users = users;
    this.service = service;
  }

  public @Nonnull ResponseEntity<ResponseType<Iterable<LoginUser>>> findAll() throws Exception {
    Iterable<User> usersAux = users.findAll();
    List<LoginUser> loginUserList = new ArrayList<>();
    for (User user : usersAux) {
      LoginUser aux = new LoginUser(user.getId(), user.getFirstname(), user.getLastname(),
          user.getEmail(), user.getAge(), user.getRole().toString(), null);
      loginUserList.add(aux);
    }

    var response = new ResponseType<Iterable<LoginUser>>();
    response.success(loginUserList);

    return ResponseEntity.ok().body(response);
  }

  public ResponseEntity<ResponseType<LoginUser>> findById(Integer id) throws Exception {
    if (id == null)
      return null;
    User user = users.findById(id).get();
    LoginUser loginUser = new LoginUser(user.getId(), user.getFirstname(), user.getLastname(),
        user.getEmail(), user.getAge(), user.getRole().toString(), null);

    var response = new ResponseType<LoginUser>();
    response.success(loginUser);

    return ResponseEntity.ok().body(response);
  }

  public ResponseEntity<ResponseType<LoginUser>> deleteUser(Integer id, LoginUser user) throws Exception {

    if (!user.getRole().equals("ADMIN")) {
      return null;
    }

    User dbUser = users.findById(id).get();
    LoginUser loginUser = new LoginUser(dbUser.getId(), dbUser.getFirstname(), dbUser.getLastname(),
        dbUser.getEmail(), user.getAge(), dbUser.getRole().toString(), null);
    users.deleteById(id);

    var response = new ResponseType<LoginUser>();
    response.success(loginUser);

    return ResponseEntity.ok().body(response);
  }

  public ResponseEntity<ResponseType<LoginUser>> editUser(LoginUser currentUser,
      User user) throws Exception {

    var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service);
    if (!isValidToken) {
      var response = new ResponseType<LoginUser>();
      response.error("Token inválida");
      return ResponseEntity.badRequest().body(response);
    }
    if (user == null) {
      var response = new ResponseType<LoginUser>();
      response.error("Utilizador não existe");
      return ResponseEntity.badRequest().body(response);
    }
    if (!currentUser.getRole().toString().equals("ADMIN") && !currentUser.getId().equals(user.getId())) {
      var response = new ResponseType<LoginUser>();
      response.error("Você não tem permissão para editar o utilizador");
      return ResponseEntity.badRequest().body(response);
    }
    User aux = users.findById(user.getId()).get();
    aux.setFirstname(user.getFirstname());
    aux.setLastname(user.getLastname());
    aux.setEmail(user.getEmail());

    if (user.getPassword() != null && !user.getPassword().isEmpty()) {
      aux.setPassword(CryptWithMD5.cryptWithMD5(user.getPassword()));
    }

    users.save(aux);

    var response = new ResponseType<LoginUser>();
    response.success(new LoginUser(user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(),
        user.getAge(), user.getRole().toString(), ""));
    return ResponseEntity.ok().body(response);
  }

}
