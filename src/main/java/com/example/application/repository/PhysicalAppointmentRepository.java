package com.example.application.repository;

import com.example.application.model.Appointments.PhysicalAppointment;
import java.util.List;
import java.util.Optional;
import javax.persistence.Table;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

@Table(name = "physical_appointments")
public interface PhysicalAppointmentRepository
    extends CrudRepository<PhysicalAppointment, Integer> {

  public List<PhysicalAppointment> findAll(Pageable rq);

  public Optional<PhysicalAppointment> findById(Integer id);
}
