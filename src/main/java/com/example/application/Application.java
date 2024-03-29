package com.example.application;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@Theme(value = "hilla-todo")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }

    /*
     * @Bean
     * CommandLineRunner init(PostRepository posts, UserRepository users) {
     * return args -> {
     * posts.save(new Post("Post", "first-post", "This is the first post", 0));
     * 
     * String auxPassword = CryptWithMD5.cryptWithMD5("rrr");
     * User aux = new User("Rodrigo", "Ralha", "rodrigo@gmail.com", auxPassword,
     * Roles.ADMIN);
     * User aux2 = new User("Manuel", "Algo", "rr@gmail.com", auxPassword,
     * Roles.MANAGER);
     * users.save(aux);
     * users.save(aux2);
     * };
     * }
     */
}
