package com.example.application.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.Table;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Practice;

import dev.hilla.mappedtypes.Pageable;

@Table(name = "pratices")
public interface PracticeRepository extends CrudRepository<Practice,Integer> {
    
    public List<Practice> findAll(Pageable rq);

    public Practice findById(Long id);
}
