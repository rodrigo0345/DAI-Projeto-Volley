package com.example.application.repository;

import java.util.List;

import javax.persistence.Table;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Report;

import dev.hilla.mappedtypes.Pageable;

@Table(name = "reports")
public interface ReportRepository extends CrudRepository<Report, Long> {
}
