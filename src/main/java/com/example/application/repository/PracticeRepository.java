package com.example.application.repository;

import com.example.application.model.Practice;
import java.util.List;
import javax.persistence.Table;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

@Table(name = "practices")
public interface PracticeRepository extends CrudRepository<Practice, Integer> {

  public List<Practice> findAll(Pageable rq);

  public Practice findById(Long Id);
}
