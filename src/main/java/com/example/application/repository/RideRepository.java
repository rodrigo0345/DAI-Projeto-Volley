package com.example.application.repository;

import com.example.application.model.Ride;
import java.util.List;
import javax.persistence.Table;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

@Table(name = "rides")
public interface RideRepository extends CrudRepository<Ride, Integer> {

  public List<Ride> findAll(Pageable rq);

  // @Query("SELECT r FROM rides ORDER BY clicks DESC LIMIT ?1 OFFSET ?2")
  // public List<Ride> findPopularPosts(Integer pag, Integer index);

  // Optional<Ride> findByDriver(User driver);

  public Ride findById(Long id);

  //@Query(value = "DELET FROM ride_passengers WHERE ride_id = :id")
  // public void removePassengerFromRide(Integer id);
}
