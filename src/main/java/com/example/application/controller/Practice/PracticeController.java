/*package com.example.application.controller.Practice;

import com.example.application.controller.Team.TeamController;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Convocatorias;
import com.example.application.model.Practice;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.PracticeRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.CallsService;
import com.example.application.service.PracticeService;

import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class PracticeController {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamController teamController;
    private final PracticeRepository practiceRepository;

    public PracticeController(PracticeRepository practiceRepository,
            TeamRepository teamRepository,
            UserRepository userRepository, TeamController teamController) {

        this.practiceRepository = practiceRepository;
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.teamController = teamController;
    }

    public ResponseEntity<ResponseType<Practice>> createPractice(Integer teamID,
            String local, LocalDateTime startDate, LocalDateTime endDate) {

        // verificar quem ta a fazer ?? permissoes ns

        if (teamID == null || local.trim().isEmpty()) {
            var response = new ResponseType<Practice>();
            response.error("Campos em branco ");
            return ResponseEntity.badRequest().body(response);
        }

        // Verificar Data para o local

        Practice newPractice = PracticeService.createPractice(practiceRepository, teamID, local, startDate,
                endDate).success;

        var response = new ResponseType<Practice>();
        response.success(newPractice);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Practice>> editPractice(LoginUser user,
            Integer teamID,
            String local, LocalDateTime startDate, LocalDateTime endDate, Long practiceID) {

        Practice practice = practiceRepository.findById(practiceID);

        if (practice == null) {
            var response = new ResponseType<Practice>();
            response.error("Não existe treino");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamID == null || local.trim().isEmpty() || practiceID == null) {
            var response = new ResponseType<Practice>();
            response.error("Campos em branco");
            return ResponseEntity.badRequest().body(response);
        }

        if (!(user.getRole().equals((Roles.MANAGER)))) {
            var response = new ResponseType<Practice>();
            response.error("Não é treinador");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamController.isPlayerInTeam(atletas).getBody().success) {
            var response = new ResponseType<Practice>();
            response.error("Os jogadores não pertecem a uma equipa");
            return ResponseEntity.badRequest().body(response);
        }

        Practice editedCall = CallsService.editCall(practiceRepository, callId,
                titulo, description, date,
                idManager, atletas).success;

        var response = new ResponseType<Practice>();
        response.success(editedCall);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Practice>> removeCall(Long convocatoriaID,
            LoginUser loginUser) {

        Practice convocatoria = convocatoriasRepository.findById(convocatoriaID);

        if (convocatoria == null) {
            var response = new ResponseType<Practice>();
            response.error("A convocatoria nao existe");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findById(loginUser.getId()).get();

        if (!(user.getRole().equals(Roles.MANAGER) ||
                user.equals(convocatoria.getManagerID()))) {
            var response = new ResponseType<Practice>();
            response.error("Não tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        Practice deletedCall = CallsService.removeCall(convocatoriasRepository,
                convocatoriaID).success;

        var response = new ResponseType<Practice>();
        response.success(deletedCall);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Practice>> addPlayer(List<Long> atletas,
            Long convocatoriaID,
            LoginUser loginUser) {

        Practice convocatoria = convocatoriasRepository.findById(convocatoriaID);

        if (convocatoria == null) {
            var response = new ResponseType<Practice>();
            response.error("Essa convocatoria nao existe");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findById(loginUser.getId()).get();
        if (!(user.getRole().equals(Roles.MANAGER) ||
                user.equals(convocatoria.getManagerID()))) {
            var response = new ResponseType<Practice>();
            response.error("Nao tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamController.isPlayerInTeam(atletas).getBody().success) {
            var response = new ResponseType<Practice>();
            response.error("Os jogadores não pertecem a uma equipa");
            return ResponseEntity.badRequest().body(response);
        }

        Practice addedPlayers = CallsService.addPlayers(atletas, convocatoriaID, convocatoriasRepository).success;

        var response = new ResponseType<Practice>();
        response.success(addedPlayers);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Practice>> removePlayer(LoginUser loginUser, Long convocatoriaId,
            List<Long> atletasId) {
        Practice convocatorias = convocatoriasRepository.findById(convocatoriaId);
        User user = userRepository.findById(loginUser.getId()).get();
        List<User> aRemover = null;

        if (!(user.equals(convocatorias.getManagerID()) ||
                user.getRole().equals(Roles.MANAGER))) {
            var response = new ResponseType<Practice>();
            response.error("Nao tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        for (Long elemento : atletasId) {
            User jogador = userRepository.findById(elemento).get();
            aRemover.add(jogador);
        }

        if (convocatorias.getPlayers().contains(aRemover)) {
            var response = new ResponseType<Practice>();
            response.error("Os jogadores não estao convocados");
            return ResponseEntity.badRequest().body(response);
        }

        Practice removedPlayers = CallsService.removePlayers(atletasId, convocatoriaId,
                convocatoriasRepository).success;
        var response = new ResponseType<Practice>();
        response.success(removedPlayers);

        return ResponseEntity.ok().body(response);
    }
}*/
