package com.example.application.repository;

import com.example.application.model.Ride;
import com.example.application.model.User.User;
import org.springframework.data.repository.CrudRepository;
import javax.persistence.Table;
import java.util.Optional;

@Table(name = "rides")
public interface RideRepository extends CrudRepository<Ride, Integer> {
    Optional<Ride> findByDriver(User driver);

}
