package com.example.application.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.application.model.User;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
