package com.example.application.controller.Auth;

import java.util.Date;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import com.example.application.repository.UserRepository;
import com.example.application.service.AuthenticationService;
import com.example.application.model.User.Roles;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.Assert.*;

public class AuthControllerTest {
    @Mock
    private UserRepository user = Mockito.mock(UserRepository.class, Mockito.CALLS_REAL_METHODS);
    @Mock
    private AuthenticationService service = Mockito.mock(AuthenticationService.class);

    private AuthenticationController auth;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        auth = new AuthenticationController(service, user);
    }
    @Test
    public void testRegister() {
        RegisterRequest request = RegisterRequest.builder()
                .firstName("Rodrigo").email("rodrigo@gmail.com")
                .lastName("Santos")
                .password("123")
                .roles(Roles.ADMIN.toString())
                .username("rodrigo")
                .build();

        String token = Jwts.builder()
                .setSubject(request.getEmail())
                .claim("roles", request.getRoles())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "c2VjcmV0LWtleWFiY2RlZmdoaWprbG1ub3BxcnN0dXh2eg==")
                .compact();
        AuthenticationResponse expectedResponse = new AuthenticationResponse(token);

        assertNotNull(request);
        System.out.println("0. " + request);

        Mockito.when(service.register(request)).thenReturn(expectedResponse);
        ResponseEntity<AuthenticationResponse> result = auth.register(request);

        assertNotNull(result);
        System.out.println("1. " + result);
        assertNotNull(result.getBody());
        System.out.println("2. " + result.getBody());

        AuthenticationResponse actualResponse = result.getBody();
        assertNotNull(actualResponse);
        System.out.println("3. " + actualResponse);

        assertEquals(expectedResponse.getToken(), actualResponse.getToken());
        System.out.println("4. " + expectedResponse.getToken());

        try {
            AuthenticationResponse register = auth.register(request).getBody();
            assertNotNull(register);
        } catch (Exception e) {
            e.printStackTrace();
        }

        AuthenticationResponse register = service.register(request);
        assertNotNull(register);
        System.out.println("5. " + register);

        AuthenticationRequest authRequest = new AuthenticationRequest(request.getEmail(), request.getPassword());
        assertNotNull(authRequest);
        System.out.println("6. " + authRequest);

        assertNotNull(result.getBody().getToken());
        System.out.println("7. " + result.getBody().getToken());

        RegisterRequest request2 = RegisterRequest.builder()
                .firstName("Rodrigoo")
                .email("rodrigoo@gmail.com")
                .lastName("Santoos")
                .password("1234")
                .roles(Roles.ADMIN.toString())
                .username("rodrigoo")
                .build();

        String token2 = Jwts.builder()
                .setSubject(request2.getEmail())
                .claim("roles", request2.getRoles())
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, "c2VjcmV0LWtleWFiY2RlZmdoaWprbG1ub3BxcnN0dXh2eg==")
                .compact();
        AuthenticationResponse expectedResponse2 = new AuthenticationResponse(token2);

        assertNotNull(request2);
        System.out.println("02. " + request2);

        Mockito.when(service.register(request2)).thenReturn(expectedResponse2);
        ResponseEntity<AuthenticationResponse> result2 = auth.register(request2);

        assertNotNull(result2);
        System.out.println("12. " + result2);
        assertNotNull(result.getBody());
        System.out.println("22. " + result2.getBody());

        AuthenticationResponse actualResponse2 = result2.getBody();
        assertNotNull(actualResponse2);
        System.out.println("32. " + actualResponse2);

        assertEquals(expectedResponse2.getToken(), actualResponse2.getToken());
        System.out.println("42. " + expectedResponse2.getToken());

        try {
            AuthenticationResponse register2 = auth.register(request2).getBody();
            assertNotNull(register2);
        } catch (Exception e) {
            e.printStackTrace();
        }

        AuthenticationResponse register2 = service.register(request2);
        assertNotNull(register2);
        System.out.println("52. " + register2);

        AuthenticationRequest authRequest2 = new AuthenticationRequest(request2.getEmail(), request2.getPassword());
        assertNotNull(authRequest2);
        System.out.println("62. " + authRequest2);

        assertNotNull(result2.getBody().getToken());
        System.out.println("72. " + result2.getBody().getToken());

        assertNotEquals(expectedResponse.getToken(), expectedResponse2.getToken());
    }
}