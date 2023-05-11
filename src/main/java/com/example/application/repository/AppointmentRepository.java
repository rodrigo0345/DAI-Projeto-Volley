package com.example.application.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.Table;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Appointment;

@Table(name = "appointments")
public interface AppointmentRepository extends CrudRepository<Appointment,Integer> {
    
    public List<Appointment> findAll(Pageable rq);

    public Optional<Appointment> findById(Integer id);

}
