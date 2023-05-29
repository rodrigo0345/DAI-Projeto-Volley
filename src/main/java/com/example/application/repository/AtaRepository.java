package com.example.application.repository;

import java.util.List;

import javax.persistence.Table;

import com.example.application.model.Ata;
import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Report;

import dev.hilla.mappedtypes.Pageable;

@Table(name = "atas")
public interface AtaRepository extends CrudRepository<Ata, Long> {
}

