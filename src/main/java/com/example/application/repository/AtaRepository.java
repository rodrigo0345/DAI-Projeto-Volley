package com.example.application.repository;

import java.util.Optional;

import javax.persistence.Table;

import com.example.application.model.Ata;
import org.springframework.data.repository.CrudRepository;

@Table(name = "atas")
public interface AtaRepository extends CrudRepository<Ata, Long> {

    public Optional<Ata> findById(Long id);
}

