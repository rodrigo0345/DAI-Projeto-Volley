package com.example.application.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.application.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    
}
