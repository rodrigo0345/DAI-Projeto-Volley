package com.example.application.Security;

import com.vaadin.flow.spring.security.VaadinWebSecurity;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

/**
 * An example code for demoing the Spring Security configuration, shouldn't
 * affect
 * the doc application itself.
 */
public class SecurityConfig extends VaadinWebSecurity {

    @Bean
    public UserDetailsManager userDetailsService() {
        // Configure users and roles in memory
        return new InMemoryUserDetailsManager(
                // the {noop} prefix tells Spring that the password is not encoded
                User.withUsername("user").password("{noop}password").roles("USER").build());
        User.withUsername("admin").password("{noop}admin").roles("ADMIN", "USER").build();
    }

}
