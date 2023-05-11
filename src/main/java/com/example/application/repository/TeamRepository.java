package com.example.application.repository;

import com.example.application.model.Convocatorias;
import com.example.application.model.Team.Team;
import com.example.application.model.User.User;
import dev.hilla.mappedtypes.Pageable;
import java.util.List;
import javax.persistence.Table;
import org.springframework.data.repository.CrudRepository;

@Table(name = "team")
public interface TeamRepository extends CrudRepository<Team, Integer> {

  public List<Team> findAll();

  public Team findById(Long id);

  public Team findByName(String name);

  // public List<NewsLike> findAllfromUser(Pageable rq);

  // public List<NewsLike> findAllfromNews(Pageable rq);
}
