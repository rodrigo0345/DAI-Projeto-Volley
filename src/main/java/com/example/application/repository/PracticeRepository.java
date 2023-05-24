package com.example.application.repository;

import com.example.application.model.Practice;
import dev.hilla.mappedtypes.Pageable;
import java.util.List;
import javax.persistence.Table;
import org.springframework.data.repository.CrudRepository;

@Table(name = "prectices")
public interface PracticeRepository extends CrudRepository<Practice, Integer> {

  public List<Practice> findAll();

  public Practice findById(Long id);

  // public List<NewsLike> findAllfromUser(Pageable rq);

  // public List<NewsLike> findAllfromNews(Pageable rq);
}
