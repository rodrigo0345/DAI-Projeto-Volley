package com.example.application.repository;

import com.example.application.model.User.User;
import java.util.Optional;
import javax.persistence.Table;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Table(name = "_user")
public interface UserRepository extends CrudRepository<User, Integer> {

  Optional<User> findByEmail(String email) throws UsernameNotFoundException;

  Optional<User> findById(Integer id) throws UsernameNotFoundException ;

  @Query("SELECT firstname, lastname, email, role FROM User WHERE email = :email")
  Optional<User> findLoginUserByEmail(String email) throws UsernameNotFoundException;

}
