package com.example.application.repository;

import com.example.application.model.Game;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface GameRepository extends CrudRepository<Game, Integer> {

  public List<Game> findAll(Pageable rq);

  public Optional<Game> findById(Integer id);
}
