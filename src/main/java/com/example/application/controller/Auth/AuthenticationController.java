package com.example.application.controller.Auth;

import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.UserRepository;
import com.example.application.service.AuthenticationService;
import com.example.application.service.JwtService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import javax.persistence.Entity;
// import com.example.application.security.CryptWithMD5;
import lombok.RequiredArgsConstructor;
import org.junit.runner.Request;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import static com.example.application.security.CryptWithMD5.cryptWithMD5;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final UserRepository users;

  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request) {
    if (users.findByEmail(request.getEmail()).isPresent()) {
      return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(service.register(request));
  }

  public ResponseEntity<AuthenticationResponse>
  authenticate(@RequestBody AuthenticationRequest request) throws Exception {
    return ResponseEntity.ok(service.authenticate(request));
  }

  public LoginUser signup(@RequestBody LoginUser currentUser,
                          @RequestBody RegisterRequest request)
      throws Exception {
    // verificar se currentUser é admin
    var isValidToken =
        this.validateToken(currentUser, currentUser.getStringToken()).getBody();
    if (!isValidToken) {
      return null;
    }

    User aux = users.findByEmail(currentUser.getEmail()).get();

    if (!aux.getRole().toString().equals("ADMIN")) {
      return null;
    }

    User user = new User();
    try {
      user.setEmail(request.getEmail());
    } catch (Exception e) {
      return null; // provisorio
    }
    // verificar se o email existe
    try {
      users.findByEmail(request.getEmail());
    } catch (Exception e) {
      return null;
    }

    // verificar que os dados são validos
    if (request.getFirstName().matches(".\\d.") ||
        request.getLastName().matches(".\\d.")) {
      return null;
    }

    if (!request.getPassword().matches(".\\d.")) {
    }

    // encriptar palavra pass
    // user.setPassword(CryptWithMD5.cryptWithMD5(request.getPassword()));
    // registar na base de dados

    user.setFirstname(request.getFirstName());
    user.setLastname(request.getLastName());
    user.setRole(Roles.USER);
    users.save(user);

    // criar token e returnar o utilizador check
    return this.login(user.getEmail(), user.getPassword());
  }

  public LoginUser login(String email, String password) throws Exception {

    User user = null;
    try {
      user = users.findByEmail(email).get();
    } catch (Exception e) {
      System.err.println(e);
    }

    if (user == null) {
      return null;
    }

    RegisterRequest request = new RegisterRequest(
        user.getFirstname(), user.getLastname(), user.getUsername(),
        user.getEmail(), user.getPassword(), user.getRole().toString());

    AuthenticationRequest authRequest =
        new AuthenticationRequest(user.getEmail(), user.getPassword());

    // regista uma nova token
    AuthenticationResponse token = null;
    try {
      token = service.authenticate(authRequest);
    } catch (Exception e) {
      token = service.register(request);
    }

    System.err.println(token.getToken());

    LoginUser loginUser = new LoginUser(
        user.getId(), user.getFirstname(), user.getLastname(), user.getEmail(),
        user.getRole().toString(), token.getToken());

    return loginUser;
  }

  public ResponseEntity<Boolean> validateToken(LoginUser user, String token) {
    return ResponseEntity.ok(service.isTokenValid(token, user.getEmail()));
  }
}
