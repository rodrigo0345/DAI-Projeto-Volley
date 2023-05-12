package com.example.application.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Game;



public interface GameRepository extends CrudRepository<Game,Integer> {
    
    public List<Game> findAll(Pageable rq);

    public Optional<Game> findById(Integer id);

}
