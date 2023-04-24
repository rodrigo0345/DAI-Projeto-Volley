package com.example.application.repository;

import dev.hilla.mappedtypes.Pageable;

import java.util.List;

import javax.persistence.Table;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Convocatorias;
import com.example.application.model.News.NewsLike;

@Table(name = "convocatorias")
public interface ConvocatoriasRepository extends CrudRepository<Convocatorias, Integer> {

    public List<Convocatorias> findAll();

    public Convocatorias findById(Long id);

    // public List<NewsLike> findAllfromUser(Pageable rq);

    // public List<NewsLike> findAllfromNews(Pageable rq);

}