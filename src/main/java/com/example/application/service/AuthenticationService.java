package com.example.application.service;

import com.example.application.config.RequiredArgsConstructor;
import com.example.application.controller.Auth.Wrappers.AuthenticationRequest;
import com.example.application.controller.Auth.Wrappers.AuthenticationResponse;
import com.example.application.controller.Auth.Wrappers.RegisterRequest;
import com.example.application.model.Token.Token;
import com.example.application.model.Token.TokenType;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.TokenRepository;
import com.example.application.repository.UserRepository;
import java.util.List;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private final UserRepository repository;
  private final TokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(UserRepository repository,
                               TokenRepository tokenRepository,
                               PasswordEncoder passwordEncoder,
                               JwtService jwtService,
                               AuthenticationManager authenticationManager) {
    this.repository = repository;
    this.tokenRepository = tokenRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  public String encodePassword(String password) {
    return passwordEncoder.encode(password);
  }

  public String extractUsername(String token) {
    return jwtService.extractUsername(token);
  }

  public boolean isTokenValid(String token, String username) {
    return jwtService.isTokenValid(token, username);
  }

  public AuthenticationResponse register(RegisterRequest request) {
    User user = new User(request.getFirstName(), request.getLastName(),
                         request.getEmail(), request.getPassword(), Roles.USER);
    var savedUser = repository.findByEmail(request.getEmail()).get();
    if (savedUser == null) {
      throw new RuntimeException(
          "Cannot generate a token for a User that does not exist");
    }
    var jwtToken = jwtService.generateToken(user);
    saveUserToken(savedUser, jwtToken);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  public AuthenticationResponse authenticate(AuthenticationRequest request)
      throws Exception {

    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              (Object)request.getEmail(), (Object)request.getPassword()));
    } catch (Exception e) {
      throw new Exception(
          "Invalid request, the token might be expired or revoked");
    }

    var user = repository.findByEmail(request.getEmail())
                   .orElseThrow(() -> new Exception("User not found"));
    var jwtToken = jwtService.generateToken(user);
    revokeAllUserTokens(user);
    saveUserToken(user, jwtToken);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  private void saveUserToken(User user, String jwtToken) {
    var token = Token.builder()
                    .user(user)
                    .token(jwtToken)
                    .tokenType(TokenType.BEARER)
                    .expired(false)
                    .revoked(false)
                    .build();
    tokenRepository.save(token);
  }

  private void revokeAllUserTokens(User user) {
    List<Token> validUserTokens =
        tokenRepository.findAllValidTokenByUser(user.getId());
    if (validUserTokens.isEmpty())
      return;
    validUserTokens.forEach(token -> {
      token.setExpired(true);
      token.setRevoked(true);
    });
    tokenRepository.saveAll(validUserTokens);
  }

  public static LoginUser convertToLoginUser(User user, Token token) {
    if (token == null) {
      return new LoginUser(user.getId(), user.getFirstname(),
                           user.getLastname(), user.getEmail(), user.getAge(),
                           user.getRole().toString(), null);
    }
    return new LoginUser(user.getId(), user.getFirstname(), user.getLastname(),
                         user.getEmail(), user.getAge(),
                         user.getRole().toString(), token.getToken());
  }
}
