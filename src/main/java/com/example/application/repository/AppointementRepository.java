package com.example.application.repository;

import dev.hilla.mappedtypes.Pageable;

import java.util.List;

import javax.persistence.Table;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Appointment;
import com.example.application.model.Convocatorias;

@Table(name = "convocatorias")
public interface AppointementRepository extends CrudRepository<Appointment, Integer> {

    public List<Appointment> findAll();

    public Convocatorias findById(Long id);

    // public List<NewsLike> findAllfromUser(Pageable rq);

    // public List<NewsLike> findAllfromNews(Pageable rq);

}