package com.example.application.controller.Practice;

import com.example.application.config.RequiredArgsConstructor;
import com.example.application.controller.Team.TeamController;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Practice;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.PracticeRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.PracticeService;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
@AllArgsConstructor
public class PracticeController {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamController teamController;
    private final PracticeRepository practiceRepository;

    public List<Practice> findAll() {
        try {
            return practiceRepository.findAll();
        } catch (Exception e) {
            return null;
        }
    }

    public ResponseEntity<ResponseType<Practice>> createPractice(Integer teamID,
            String local, String startDate, String endDate) {

        // TODO parse the startDate (LocalDateTime) and endDate

        if (teamID == null || local.trim().isEmpty()) {
            var response = new ResponseType<Practice>();
            response.error("Campos em branco ");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamRepository.findById(teamID).isPresent() || teamRepository.findById(teamID).get().getManagerID() == null
                || teamRepository.findById(teamID).get().getManagerID() == null) {
            var response = new ResponseType<Practice>();
            response.error("A equipa não existe/não é ilgível para treinar");
            return ResponseEntity.badRequest().body(response);
        }

        List<Practice> allPratice = (List<Practice>) practiceRepository.findAll();

        for (Practice p : allPratice) {
            if (p.getLocal().equals(local)) {
                if (doesLocalOverlap(p, startDate, endDate)) {
                    var response = new ResponseType<Practice>();
                    response.error("Local ocupado ");
                    return ResponseEntity.badRequest().body(response);
                }
            }
        }
        String team = teamRepository.findById(teamID).get().getName();

        Practice newPractice = PracticeService.createPractice(practiceRepository, team, local, startDate,
                endDate).success;

        var response = new ResponseType<Practice>();
        response.success(newPractice);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Practice>> editPractice(LoginUser loginUser,
            String local, LocalDateTime startDate, LocalDateTime endDate, Long practiceID) {

        Practice practice = practiceRepository.findById(practiceID);
        User user = userRepository.findById(loginUser.getId()).get();

        if (user.getRole().equals(Roles.MANAGER)) {
            var response = new ResponseType<Practice>();
            response.error("Não é treinador");
            return ResponseEntity.badRequest().body(response);
        }

        if (practice == null) {
            var response = new ResponseType<Practice>();
            response.error("Não existe treino");
            return ResponseEntity.badRequest().body(response);
        }

        if (!(user.getId().equals(teamRepository.findByName(practice.getTeam()).getManagerID()))) {
            var response = new ResponseType<Practice>();
            response.error("Não é o autor do treino");
            return ResponseEntity.badRequest().body(response);
        }

        if (local.trim().isEmpty() || practiceID == null) {
            var response = new ResponseType<Practice>();
            response.error("Campos em branco");
            return ResponseEntity.badRequest().body(response);
        }

        List<Practice> allPratice = (List<Practice>) practiceRepository.findAll();

        for (Practice p : allPratice) {
            if (p.getLocal().equals(local)) {
                if (doesLocalOverlap(p, startDate, endDate)) {
                    var response = new ResponseType<Practice>();
                    response.error("Local ocupado ");
                    return ResponseEntity.badRequest().body(response);
                }
            }
        }

        Practice editedCall = PracticeService.editPratice(practiceRepository, practice, local, startDate,
                endDate).success;

        var response = new ResponseType<Practice>();
        response.success(editedCall);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Practice>> removePractice(Long practiceID,
            LoginUser loginUser) {

        Practice practice = practiceRepository.findById(practiceID);

        if (practice == null) {
            var response = new ResponseType<Practice>();
            response.error("A convocatoria nao existe");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findById(loginUser.getId()).get();

        if (!(user.getRole().equals(Roles.MANAGER) ||
                user.getId().equals(teamRepository.findByName(practice.getTeam()).getManagerID()))) {
            var response = new ResponseType<Practice>();
            response.error("Não tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        Practice deletedCall = PracticeService.removePratice(practiceRepository,
                practice).success;

        var response = new ResponseType<Practice>();
        response.success(deletedCall);
        return ResponseEntity.ok().body(response);
    }

    public boolean doesLocalOverlap(Practice other, LocalDateTime startDate, LocalDateTime endDate) {
        return !startDate.isAfter(other.getEndDate()) && !endDate.isBefore(other.getStartDate())
                && (!startDate.isEqual(other.getStartDate()) || !endDate.isEqual(other.getEndDate()));
    }

    /*
     * public ResponseEntity<ResponseType<List<Practice>>> getPracticesByTeam(Long
     * teamID) {
     * Team team = teamRepository.findById(teamID);
     * 
     * if (team == null) {
     * var response = new ResponseType<List<Practice>>();
     * response.error("A equipa não existe ");
     * return ResponseEntity.badRequest().body(response);
     * }
     * 
     * List<Practice> practices = practiceRepository.findByTeam(team);
     * 
     * var response = new ResponseType<List<Practice>>();
     * response.success(practices);
     * return ResponseEntity.ok().body(response);
     * }
     */

}