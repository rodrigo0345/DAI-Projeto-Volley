package com.example.application;

import com.example.application.model.Post;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.PostRepository;
import com.example.application.repository.UserRepository;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * The entry point of the Spring Boot application.
 *
 * Use the @PWA annotation make the application installable on phones, tablets
 * and some desktop browsers.
 *
 */
@SpringBootApplication
@Theme(value = "hilla-todo")
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }

    @Bean
    CommandLineRunner init(PostRepository posts, UserRepository users) {
        return args -> {
            posts.save(new Post("First Post", "first-post", "This is the first post", "David"));
            User aux = new User("Rodrigo", "Ralha", "rodrigo@gmail.com", "rrr", Roles.ADMIN);
            users.save(aux);
        };
    }

}
