package com.example.application.controller.Ata;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.example.application.model.Ata;
import com.example.application.model.Practice;
import com.example.application.repository.AtaRepository;
import com.example.application.repository.PracticeRepository;
import org.checkerframework.checker.units.qual.A;
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

public class AtaController {

    private final PracticeRepository practiceRepository;
    private final AtaRepository ataRepository;


    public ResponseEntity<ResponseType<Ata>> createAta(String title, Long practiceId, String summary) {
        // validate that team id is valid

        Practice pratice = practiceRepository.findById(practiceId);


        try {
            var team = practiceRepository.findById(practiceId);
        } catch (Exception e) {
            var response = new ResponseType<Ata>();
            response.error("O treino não existe");
            return ResponseEntity.badRequest().body(response);
        }

        if(title.trim().isEmpty() || summary.trim().isEmpty()){
            var response = new ResponseType<Ata>();
            response.error("Não pode colocar campos em branco");
            return ResponseEntity.badRequest().body(response);
        }


        var date = LocalDateTime.now().toString();
        var ata = new Ata();
        ata.setPracticeId(practiceId);
        ata.setCreatedAt(date);
        ata.setTitle(title);
        ata.setSummary(summary);
        ata.setTeamId(pratice.getTeam());
        ataRepository.save(ata);

        var response = new ResponseType<Ata>();
        response.success(ata);
        return ResponseEntity.ok().body(response);
    }

    // find all
    public ResponseEntity<ResponseType<Iterable<Ata>>> findAll() {
        var ata = ataRepository.findAll();
        var response = new ResponseType<Iterable<Ata>>();
        response.success(ata);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Ata>> removeAta(Long idAta){

       ataRepository.deleteById(idAta);

       var response = new ResponseType<Ata>();
       response.success(null);
       return ResponseEntity.ok().body(response);

    }

    // do not touch, it is
    // used so hilla identifies
    // this class type
    public Ata dummy() {
        return new Ata();
    }
}
