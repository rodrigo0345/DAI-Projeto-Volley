package com.example.application.repository;

import com.example.application.model.Report;
import dev.hilla.mappedtypes.Pageable;
import java.util.List;
import javax.persistence.Table;
import org.springframework.data.repository.CrudRepository;

@Table(name = "reports")
public interface ReportRepository extends CrudRepository<Report, Long> {}
