package com.example.application.repository;

import dev.hilla.mappedtypes.Pageable;

import java.util.List;

import javax.persistence.Table;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Convocatorias;
import com.example.application.model.Game;

@Table(name = "games")
public interface GameRepository extends CrudRepository<Game, Integer> {

    public List<Game> findAll();

    public Convocatorias findById(Long id);

    // public List<NewsLike> findAllfromUser(Pageable rq);

    // public List<NewsLike> findAllfromNews(Pageable rq);

}