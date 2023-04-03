package com.example.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;

import javax.persistence.Table;
import java.util.Optional;

@Table(name = "_user")
public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByEmail(String email) throws UsernameNotFoundException;

    @Query("SELECT firstname, lastname, email, role, tokens FROM User WHERE email = :email")
    Optional<User> findLoginUserByEmail(String email) throws UsernameNotFoundException;
}
