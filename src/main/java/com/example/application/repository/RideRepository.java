package com.example.application.repository;

import com.example.application.model.Ride;
import com.example.application.model.User.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import javax.persistence.Table;

import java.util.List;
import java.util.Optional;

@Table(name = "rides")
public interface RideRepository extends CrudRepository<Ride, Integer> {

    // @Query("SELECT r FROM rides r ORDER BY r.id DESC LIMIT ?1 OFFSET ?2")
    // public List<Ride> findLimitedPosts(Integer pag, Integer index);

    // @Query("SELECT r FROM rides ORDER BY clicks DESC LIMIT ?1 OFFSET ?2")
    // public List<Ride> findPopularPosts(Integer pag, Integer index);

    // Optional<Ride> findByDriver(User driver);

    // Ride findById(Long id);

}
