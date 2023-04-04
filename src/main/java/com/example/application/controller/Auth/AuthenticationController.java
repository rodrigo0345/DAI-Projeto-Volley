package com.example.application.controller.Auth;

import com.example.application.controller.ResponseType.ResponseType;
import com.example.application.model.User.Roles;
//import com.example.application.security.CryptWithMD5;
import com.example.application.security.CryptWithMD5;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.application.service.AuthenticationService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.UserRepository;
import dev.hilla.Endpoint;

//import static com.example.application.security.CryptWithMD5.cryptWithMD5;

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

    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request) throws Exception {
        return ResponseEntity.ok(service.authenticate(request));
    }

    public ResponseEntity<ResponseType<LoginUser>> signup(
            @RequestBody LoginUser currentUser,
            @RequestBody RegisterRequest request) throws Exception {
        // verificar se currentUser é admin
        var isValidToken = this.validateToken(currentUser, currentUser.getStringToken()).getBody();
        if (!isValidToken) {
            var response = new ResponseType<LoginUser>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        User aux = null;
        try {
            aux = users.findByEmail(currentUser.getEmail()).get();
        } catch (Exception e) {
            var response = new ResponseType<LoginUser>();
            response.error("Você não está autenticado");
            return ResponseEntity.badRequest().body(response);
        }

        if (!aux.getRole().toString().equals("ADMIN")) {
            var response = new ResponseType<LoginUser>();
            response.error("Você não tem permissão para criar um novo utilizador");
            return ResponseEntity.badRequest().body(response);
        }

        User user = new User();
        try {
            user.setEmail(request.getEmail());
        } catch (Exception e) {
            var response = new ResponseType<LoginUser>();
            response.error("Email inválido");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se o email existe
        try {
            var result = users.findByEmail(request.getEmail());
            if (result.isPresent()) {
                var response = new ResponseType<LoginUser>();
                response.error("O email já existe");
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            return null;
        }

        // verificar que os dados são validos
        // if (request.getFirstName().matches(".\\d.") ||
        // request.getLastName().matches(".\\d.")) {
        // return null;
        // }

        // if (!request.getPassword().matches(".\\d.")) {

        // }

        // encriptar palavra pass
        user.setPassword(CryptWithMD5.cryptWithMD5(request.getPassword()));
        // registar na base de dados

        user.setFirstname(request.getFirstName());
        user.setLastname(request.getLastName());

        if (!(request.getRoles() == null)) {
            var role = Roles.valueOf(request.getRoles());
            user.setRole(role);
        } else {
            user.setRole(Roles.USER);
        }

        // falta encriptar
        // user.setPassword(request.getPassword());
        users.save(user);

        // criar token e returnar o utilizador check
        return this.login(user.getEmail(), user.getPassword());
    }

    public ResponseEntity<ResponseType<LoginUser>> login(String email, String password) throws Exception {

        User user = null;
        try {
            user = users.findByEmail(email).get();
        } catch (Exception e) {
            System.err.println(e);
        }

        if (user == null) {
            var response = new ResponseType<LoginUser>();
            response.error("Utilizador não existe");
            return ResponseEntity.badRequest().body(response);
        }

        password = CryptWithMD5.cryptWithMD5(password);

        if (!password.equals(user.getPassword())) {
            var response = new ResponseType<LoginUser>();
            response.error("Password incorrecta");
            return ResponseEntity.badRequest().body(response);
        }

        RegisterRequest request = new RegisterRequest(user.getFirstname(), user.getLastname(), user.getUsername(),
                user.getEmail(),
                user.getPassword(), user.getRole().toString());

        AuthenticationRequest authRequest = new AuthenticationRequest(user.getEmail(), user.getPassword());

        // regista uma nova token
        AuthenticationResponse token = null;
        try {
            token = service.authenticate(authRequest);
        } catch (Exception e) {
            token = service.register(request);
        }

        System.err.println(token.getToken());

        LoginUser loginUser = new LoginUser(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getRole().toString(),
                token.getToken());

        var response = new ResponseType<LoginUser>();
        response.success(loginUser);
        return ResponseEntity.accepted().body(response);
    }

    @AnonymousAllowed
    public ResponseEntity<Boolean> validateToken(LoginUser user, String token) {
        return ResponseEntity.ok(service.isTokenValid(token, user.getEmail()));
    }

}
