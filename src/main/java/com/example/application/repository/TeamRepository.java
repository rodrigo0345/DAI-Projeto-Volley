package com.example.application.repository;

import dev.hilla.mappedtypes.Pageable;

import java.util.List;
import java.util.Optional;

import javax.persistence.Table;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Team.Team;
import com.example.application.model.User.User;

@Table(name = "team")
public interface TeamRepository extends CrudRepository<Team, Long> {

    public List<Team> findAll();

    public Optional<Team> findById(Long id);

    public Team findByName(String name);

    // public List<NewsLike> findAllfromUser(Pageable rq);

    // public List<NewsLike> findAllfromNews(Pageable rq);

}
