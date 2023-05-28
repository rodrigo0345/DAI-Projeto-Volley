package com.example.application.controller.Reports;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Report;
import com.example.application.repository.ReportRepository;
import com.example.application.repository.TeamRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import lombok.AllArgsConstructor;

@Endpoint
@AnonymousAllowed
@AllArgsConstructor

public class ReportController {

    private final TeamRepository teamRepository;
    private final ReportRepository reportRepository;

    public ResponseEntity<ResponseType<Report>> createReport(ReportType type, Long teamID, byte[] image) {
        // validate that team id is valid
        try {
            var team = teamRepository.findById(teamID);
        } catch (Exception e) {
            var response = new ResponseType<Report>();
            response.error("A equipa não existe");
            return ResponseEntity.badRequest().body(response);
        }

        // check if image is less than 5Mb
        if (image.length > 5 * 1024 * 1024) {
            var response = new ResponseType<Report>();
            response.error("A imagem é demasiado grande");
            return ResponseEntity.badRequest().body(response);
        }

        var date = LocalDateTime.now().toString();
        var report = new Report();
        report.setTeamId(teamID);
        report.setCreatedAt(date);
        report.setImage(image);
        report.setType(type);
        reportRepository.save(report);

        var response = new ResponseType<Report>();
        response.success(report);
        return ResponseEntity.ok().body(response);
    }

    // find all
    public ResponseEntity<ResponseType<Iterable<Report>>> findAll() {
        var reports = reportRepository.findAll();
        var response = new ResponseType<Iterable<Report>>();
        response.success(reports);
        return ResponseEntity.ok().body(response);
    }

    // do not touch, it is
    // used so hilla identifies
    // this class type
    public Report dummy() {
        return new Report();
    }
}
