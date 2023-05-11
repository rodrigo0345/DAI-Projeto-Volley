package com.example.application.controller.Team;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Team.Escalao;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.CalendarRepository;
import com.example.application.repository.NewsRepository;
import com.example.application.repository.RideRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.AuthenticationService;
import com.example.application.service.TeamService;
import java.util.List;

import com.example.application.service.TokenService;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class TeamController {

    private final RideRepository ridesRepository;
    private final NewsRepository newsRepository;
    private final UserRepository usersRepository;
    private final CalendarRepository calendarRepository;
    private final TeamRepository teamRepository;
    private final AuthenticationService service;
    private final TeamService teamService;

    public ResponseEntity<ResponseType<List<LoginUser>>> getPlayersWithoutTeam() {

        List<User> players = new ArrayList<User>();

        usersRepository.findAll().forEach(el -> {
            if (el.getRole().equals(Roles.USER)) {
                players.add(el);
            }
        });

        List<Team> teams = teamRepository.findAll();

        for (Team t : teams) {
            players.removeAll(t.getPlayers());
        }

        var response = new ResponseType<List<LoginUser>>();
        List<LoginUser> loginUsers = new ArrayList<LoginUser>();
        players.forEach(el -> {
            loginUsers.add(AuthenticationService.convertToLoginUser(el, null));
        });
        response.success(loginUsers);
        return ResponseEntity.ok().body(response);
    }

    public Team findAll() {
        List<Team> teams = teamRepository.findAll();
        return teams.get(0);
    }

    public ResponseEntity<ResponseType<Team>> createTeamWithManager(LoginUser loginUser,
            List<Integer> jogadores,
            String escalaoI,
            String name) {
        Escalao escalao = Escalao.valueOf(escalaoI.toUpperCase());
        User user = usersRepository.findById(loginUser.getId()).get();
        if (!(user.getRole().equals((Roles.MANAGER)))) {
            var response = new ResponseType<Team>();
            response.error("Não tem permissões para criar equipas");
            return ResponseEntity.badRequest().body(response);
        }
        if (jogadores == null) {
            var response = new ResponseType<Team>();
            response.error("A equipa esta vazia");
            return ResponseEntity.badRequest().body(response);
        }
        if (escalao == null) {
            var response = new ResponseType<Team>();
            response.error("O escalão não existe");
            return ResponseEntity.badRequest().body(response);
        }
        if (name.trim().isEmpty()) {
            var response = new ResponseType<Team>();
            response.error("O nome da equipa não pode ser vazio");
            return ResponseEntity.badRequest().body(response);
        }
        if (teamRepository.findByName(name) != null) {
            var response = new ResponseType<Team>();
            response.error("O nome da equipa já existe");
            return ResponseEntity.badRequest().body(response);
        }

        Team createdTeam = teamService.criarEquipa(teamRepository, user, jogadores, escalao, name).success;

        var response = new ResponseType<Team>();
        response.success(createdTeam);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Team>> createTeamWithAdmin(LoginUser loginUser,
            List<Integer> equipa,
            String escalaoI,
            String name) {
        // Integer managerId
        Escalao escalao = Escalao.valueOf(escalaoI.toUpperCase());

        User user = usersRepository.findById(loginUser.getId()).get();
        // User manager = usersRepository.findById(managerId).get();

        if (!(user.getRole().equals((Roles.ADMIN)))) {
            var response = new ResponseType<Team>();
            response.error("Não tem permissões para criar equipas");
            // return ResponseEntity.badRequest().body(response);
            return null;
        }
        if (equipa == null) {
            var response = new ResponseType<Team>();
            response.error("A equipa esta vazia");
            // return ResponseEntity.badRequest().body(response);
            return null;
        }
        if (escalao == null) {
            var response = new ResponseType<Team>();
            response.error("O escalão não existe");
            // return ResponseEntity.badRequest().body(response);
            return null;
        }

        Team createdTeam = teamService.criarEquipa(teamRepository, user, equipa, escalao, name).success;

        var response = new ResponseType<Team>();
        response.success(createdTeam);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Team>> editTeam(LoginUser currentUser,
            Integer teamId,
            Integer managerId,
            List<Integer> equipa,
            String name) {

        // verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service);
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }

        Team team = teamRepository.findById(teamId).get();
        // verificar se currentUser é admin ou treinador da equipa
        if (!currentUser.getRole().toString().equals("ADMIN")
                && !currentUser.getId().equals(team.getManager().getId())) {
            var response = new ResponseType<Team>();
            response.error("Você não tem permissão para editar a equipa");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se a equipa é válida (nao nula)
        if (team == null) {
            var response = new ResponseType<Team>();
            response.error("A equipa não existe");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se o nome da equipa é válido (nao vazio)
        if (name.trim().isEmpty()) {
            var response = new ResponseType<Team>();
            response.error("O nome da equipa não pode ser vazio");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se o nome da equipa editada já existe (overlap)
        if (teamRepository.findByName(name) != null) {
            var response = new ResponseType<Team>();
            response.error("O nome da equipa já existe");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se o nome do treinador é válido (nao vazio) MESMA CENA DE CIMA IDK
        if (usersRepository.findById(managerId).isEmpty()) {
            var response = new ResponseType<Team>();
            response.error("O treinador não existe");
            return ResponseEntity.badRequest().body(response);
        }

        Team editedTeam = teamService.editarEquipa(teamRepository, teamId, managerId, equipa, name).success;

        var response = new ResponseType<Team>();
        response.success(editedTeam);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Team>> removeTeam(LoginUser loginUser,
            Integer teamId) {
        User user = usersRepository.findById(loginUser.getId()).get();

        if (!(user.getId().equals(teamRepository.findById(teamId).get().getManager().getId())
                || user.getRole().equals(Roles.ADMIN))) {
            var response = new ResponseType<Team>();
            response.error = ("Não tem permissoes para remover equipas");
            return ResponseEntity.ok().body(response);
        }

        Team deletedTeam = teamService.removerEquipa(teamRepository, teamId).success;

        var response = new ResponseType<Team>();
        response.success(deletedTeam);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Team>> addPlayer(LoginUser currentUser,
            Integer teamId,
            List<Integer> equipa) {
        // verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service);
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se currentUser é admin ou treinador da equipa
        if (!((currentUser.getRole().equals("MANAGER"))
                || currentUser.getRole().equals("ADMIN"))) {
            var response = new ResponseType<Team>();
            response.error("Não tem permissoes para remover jogadores");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se o jogador é valido
        if (equipa.isEmpty()) {
            var response = new ResponseType<Team>();
            response.error("O jogador não existe");
            return ResponseEntity.badRequest().body(response);
        }

        // verificar se o jogador já pertence a outra equipa
        Set<User> jogadoresEmEquipas = new HashSet<>();
        List<Team> todasEquipas = teamRepository.findAll();

        for (Team t : todasEquipas) {
            jogadoresEmEquipas.addAll(t.getPlayers());
        }

        List<User> atletas = null;

        for (Integer elemento : equipa) {
            User atleta = usersRepository.findById(elemento).get();
            atletas.add(atleta);
        }

        for (User user : atletas) {
            if (jogadoresEmEquipas.contains(user)) {
                var response = new ResponseType<Team>();
                response.error(user.getFirstname() + " " + user.getLastname() + " já pertence a outra equipa");
                return ResponseEntity.badRequest().body(response);
            }
        }

        Team addedPlayerTeam = teamService.adicionarJogador(teamRepository, teamId, atletas).success;

        var response = new ResponseType<Team>();
        response.success(addedPlayerTeam);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Team>> removePlayer(LoginUser loginUser,
            Integer teamId,
            List<Integer> jogadoresRemovidos) {

        User user = usersRepository.findById(loginUser.getId()).get();
        // verificar se o token é válido
        var isValidToken = TokenService.validateToken(loginUser, loginUser.getStringToken(), service);
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se currentUser é admin ou treinador da equipa
        if (!(user.getRole().toString().equals("MANAGER") || user.getRole().toString().equals("ADMIN"))) {
            var response = new ResponseType<Team>();
            response.error("Não tem permissoes para remover jogadores");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se a equipa é válida
        if (teamRepository.existsById(teamId)) {
            var response = new ResponseType<Team>();
            response.error("Sem equipa selecionada");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se os jogadores são válidos
        if (jogadoresRemovidos.isEmpty()) {
            var response = new ResponseType<Team>();
            response.error("Sem jogadores selecionados");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se os jogadores pertencem à equipa
        if (teamRepository.findById(teamId).get().getPlayers().contains(jogadoresRemovidos)) {
            var response = new ResponseType<Team>();
            response.error("Os atletas nao pertecem a esta equipa");
            return ResponseEntity.badRequest().body(response);
        }

        Team removedPlayerTeam = teamService.removerJogador(teamRepository, teamId, jogadoresRemovidos).success;

        var response = new ResponseType<Team>();
        response.success(removedPlayerTeam);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Team>> switchManager(LoginUser currentUser,
            Integer teamId,
            Integer managerId) {
        Team team = teamRepository.findById(teamId).get();

        // verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service);
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se currentUser é admin
        if (!currentUser.getRole().equals("ADMIN")) {
            var response = new ResponseType<Team>();
            response.error("Você não tem permissão para editar a equipa");
            return ResponseEntity.badRequest().body(response);
        }
        // verificar se o treinador é MANAGER
        User treinadorNovo = usersRepository.findById(managerId).get();
        if (!treinadorNovo.getRole().toString().equals("MANAGER")) {
            var response = new ResponseType<Team>();
            response.error("O utilizador selecionado não é treinador");
            return ResponseEntity.badRequest().body(response);
        }

        Team changedManagerTeam = teamService.trocarTreinador(teamRepository, teamId, managerId).success;

        var response = new ResponseType<Team>();
        response.success(changedManagerTeam);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Boolean>> isPlayerInTeam(List<Long> atletas) {

        List<User> atleta = null;

        for (Long elemento : atletas) {
            User jogador = usersRepository.findById(elemento).get();
            atleta.add(jogador);
        }

        Set<User> jogadoresEmEquipas = new HashSet<User>();
        List<Team> todasEquipas = teamRepository.findAll();

        for (Team t : todasEquipas) {
            jogadoresEmEquipas.addAll(t.getPlayers());
        }

        if (!(jogadoresEmEquipas.contains(atleta))) {
            var response = new ResponseType<Boolean>();
            response.success(true);
            return ResponseEntity.badRequest().body(response);
        }

        var response = new ResponseType<Boolean>();
        response.success(false);
        return ResponseEntity.ok().body(response);
    }

    /*
     * manha, nao apagar, é preciso isto para
     * ter o tipo "Team" no frontend
     */
    public Team getTeamExample() {
        return null;
    }
}