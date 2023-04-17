package com.example.application.repository;

import com.example.application.model.Ride;

import org.springframework.data.domain.Pageable;

import org.springframework.data.repository.CrudRepository;

import javax.persistence.Table;

import java.util.List;

@Table(name = "rides")
public interface RideRepository extends CrudRepository<Ride, Integer> {

    public List<Ride> findAll(Pageable rq);

    // @Query("SELECT r FROM rides ORDER BY clicks DESC LIMIT ?1 OFFSET ?2")
    // public List<Ride> findPopularPosts(Integer pag, Integer index);

    // Optional<Ride> findByDriver(User driver);

    // Ride findById(Long id);

}
