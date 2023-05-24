package com.example.application.repository;

import java.util.List;
import java.util.Optional;

import javax.persistence.Table;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Appointments.TechnicalAppointment;

@Table(name = "technical_appointments")
public interface TechnicalAppointmentRepository extends CrudRepository<TechnicalAppointment,Integer> {
    
    public List<TechnicalAppointment> findAll(Pageable rq);

    public Optional<TechnicalAppointment> findById(Integer id);

}

