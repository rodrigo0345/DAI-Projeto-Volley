package com.example.application.repository;

import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserRepository extends CrudRepository<User, Integer> {

  Optional<User> findByEmail(String email) throws UsernameNotFoundException;
  @Query(
      "SELECT firstname, lastname, email, role, tokens FROM User WHERE email = :email")
  Optional<LoginUser>
  findLoginUserByEmail(String email) throws UsernameNotFoundException;
}
