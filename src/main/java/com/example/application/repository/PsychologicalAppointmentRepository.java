package com.example.application.repository;

import com.example.application.model.Appointments.PsychologicalAppointment;
import java.util.List;
import java.util.Optional;
import javax.persistence.Table;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

@Table(name = "psychological_appointments")
public interface PsychologicalAppointmentRepository
    extends CrudRepository<PsychologicalAppointment, Integer> {

  public List<PsychologicalAppointment> findAll(Pageable rq);

  public Optional<PsychologicalAppointment> findById(Integer id);
}
