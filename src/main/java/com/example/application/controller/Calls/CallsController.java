package com.example.application.controller.Calls;

import com.example.application.controller.Team.TeamController;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Convocatorias;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.ConvocatoriasRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CallsController {

    private final ConvocatoriasRepository convocatoriasRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamController teamController;

    public CallsController(ConvocatoriasRepository convocatoriasRepository, TeamRepository teamRepository,
            UserRepository userRepository, TeamController teamController) {

        this.convocatoriasRepository = convocatoriasRepository;
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
        this.teamController = teamController;
    }

    public ResponseEntity<ResponseType<Convocatorias>> createCall(List<Long> atletas,
            String titulo, String description, LocalDateTime date, Long idManager) {

        if (atletas.isEmpty() || titulo.trim().isEmpty() || description.trim().equals(null) || idManager == null) {
            var response = new ResponseType<Convocatorias>();
            response.error("Campos em branco ");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findById(idManager).get();
        if (!(user.getRole().toString().equals("MANAGER"))) {
            var response = new ResponseType<Convocatorias>();
            response.error("Não é treinador");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamController.isPlayerInTeam(atletas).getBody().success) {
            var response = new ResponseType<Convocatorias>();
            response.error("Os jogadores não pertecem a uma equipa");
            return ResponseEntity.badRequest().body(response);
        }

        var response = new ResponseType<Convocatorias>();
        return ResponseEntity.ok().body(response);

    }

    public ResponseEntity<ResponseType<Convocatorias>> editCall(List<Long> atletas, String titulo,
            String description, LocalDateTime date,
            Long idManager, Long convocatoria) {

        Convocatorias convocatorias = convocatoriasRepository.findById(convocatoria);

        if (convocatorias.equals(null)) {
            var response = new ResponseType<Convocatorias>();
            response.error("Não existe convocatoria");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findById(idManager).get();

        if (user.equals(convocatorias.getManagerID())) {
            var response = new ResponseType<Convocatorias>();
            response.error("Não tem permissoes para editar");
            return ResponseEntity.badRequest().body(response);
        }

        if (atletas.equals(null) || titulo.equals(null) || description.equals(null) || idManager.equals(null)) {
            var response = new ResponseType<Convocatorias>();
            response.error("Campos em branco ");
            return ResponseEntity.badRequest().body(response);
        }

        if (!(user.getRole().equals((Roles.MANAGER)))) {
            var response = new ResponseType<Convocatorias>();
            response.error("Não é treinador");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamController.isPlayerInTeam(atletas).getBody().success) {
            var response = new ResponseType<Convocatorias>();
            response.error("Os jogadores não pertecem a uma equipa");
            return ResponseEntity.badRequest().body(response);
        }

        var response = new ResponseType<Convocatorias>();
        return ResponseEntity.ok().body(response);

    }

    public ResponseEntity<ResponseType<Convocatorias>> removeCall(Long convocatoriaID,
            LoginUser loginUser) {

        Convocatorias convocatoria = convocatoriasRepository.findById(convocatoriaID);

        if (convocatoria.equals(null)) {
            var response = new ResponseType<Convocatorias>();
            response.error("A convocatoria nao existe");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findById(loginUser.getId()).get();

        if (!(user.getRole().equals(Roles.MANAGER) || user.equals(convocatoria.getManagerID()))) {
            var response = new ResponseType<Convocatorias>();
            response.error("Não tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        var response = new ResponseType<Convocatorias>();
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<List<Long>>> addPlayer(List<Long> atletas, Long convocatoria,
            LoginUser loginUser) {

        Convocatorias convocatorias = convocatoriasRepository.findById(convocatoria);

        if (convocatorias.equals(null)) {
            var response = new ResponseType<List<Long>>();
            response.error("Essa convocatoria nao existe");
            return ResponseEntity.badRequest().body(response);
        }

        User user = userRepository.findById(loginUser.getId()).get();
        if (!(user.getRole().equals(Roles.MANAGER) || user.equals(convocatorias.getManagerID()))) {
            var response = new ResponseType<List<Long>>();
            response.error("Nao tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamController.isPlayerInTeam(atletas).getBody().success) {
            var response = new ResponseType<List<Long>>();
            response.error("Os jogadores não pertecem a uma equipa");
            return ResponseEntity.badRequest().body(response);
        }

        var response = new ResponseType<List<Long>>();
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<List<Long>>> removePlayer(LoginUser loginUser,
            Long convocatoria, List<Long> atletas) {

        Convocatorias convocatorias = convocatoriasRepository.findById(convocatoria);
        User user = userRepository.findById(loginUser.getId()).get();
        List<User> aRemover = null;

        if (!(user.equals(convocatorias.getManagerID()) || user.getRole().equals(Roles.MANAGER))) {
            var response = new ResponseType<List<Long>>();
            response.error("Nao tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        for (Long elemento : atletas) {
            User jogador = userRepository.findById(elemento).get();
            aRemover.add(jogador);
        }

        if (convocatorias.getPlayers().contains(aRemover)) {
            var response = new ResponseType<List<Long>>();
            response.error("Os jogadores não estao convocados");
            return ResponseEntity.badRequest().body(response);
        }

        var response = new ResponseType<List<Long>>();
        return ResponseEntity.ok().body(response);
    }

}
