package com.example.application.service;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Team.Escalao;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

public class TeamService {

    private static UserRepository users;

    public static ResponseType<Team> criarEquipa(TeamRepository teamRepository,
            LoginUser loginUser,
            List<Integer> equipa,
            Escalao escalao,
            String name) {
        User user = users.findById(loginUser.getId()).get();

        List<User> atletas = null;

        for (Integer elemento : equipa) {
            User atleta = users.findById(elemento).get();
            atletas.add(atleta);
        }

        Team team = new Team();
        team.setName(name);
        team.setPlayers(atletas);
        team.setManager(user);
        team.setEscalao(escalao);

        teamRepository.save(team);

        var response = new ResponseType<Team>();
        response.success(team);
        return response;
    }

    public static ResponseType<Team> editarEquipa(TeamRepository teamRepository,
            Integer teamId,
            Integer managerId,
            List<Integer> equipa,
            String name) {
        List<User> atletas = null;

        for (Integer elemento : equipa) {
            User atleta = users.findById(elemento).get();
            atletas.add(atleta);
        }
        User manager = users.findById(managerId).get();

        // fazer update da equipa
        Team team = teamRepository.findById(teamId).get();
        team.setName(name);
        team.setManager(manager);
        team.setPlayers(atletas);

        teamRepository.save(team);

        var response = new ResponseType<Team>();
        response.success(team);
        return response;
    }

    public static ResponseType<Team> removerEquipa(TeamRepository teamRepository,
            Integer teamId) {

        Team team = teamRepository.findById(teamId).get();

        teamRepository.delete(team);

        var response = new ResponseType<Team>();
        response.success(team);
        return response;

    }

    public static ResponseType<Team> adicionarJogador(TeamRepository teamRepository,
            Integer teamId,
            List<User> atletas) {

        Team team = teamRepository.findById(teamId).get();
        team.getPlayers().addAll(atletas);

        teamRepository.save(team);

        var response = new ResponseType<Team>();
        response.success(team);
        return response;
    }

    public static ResponseType<Team> removerJogador(TeamRepository teamRepository,
            Integer teamId,
            List<Integer> jogadoresRemovidos) {
        List<User> jogadores = new ArrayList<>();

        for (Integer elemento : jogadoresRemovidos) {
            User atleta = users.findById(elemento).get();
            jogadores.add(atleta);
        }

        Team team = teamRepository.findById(teamId).get();
        team.getPlayers().removeAll(jogadores);

        teamRepository.save(team);

        var response = new ResponseType<Team>();
        response.success(team);
        return response;
    }

    public static ResponseType<Team> trocarTreinador(TeamRepository teamRepository,
            Integer teamId,
            Integer managerId) {
        Team team = teamRepository.findById(teamId).get();
        team.setManager(users.findById(managerId).get());

        teamRepository.save(team);

        var response = new ResponseType<Team>();
        response.success(team);
        return response;
    }

    public ResponseEntity<ResponseType<Team>> findPlayerTeam(TeamRepository teamRepository,
            LoginUser currentUser,
            Integer id,
            AuthenticationService service) {
        // verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service);
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }

        User atleta = users.findById(id).get();
        for (Team t : teamRepository.findAll()) {
            if (t.getPlayers().contains(atleta)) {
                var response = new ResponseType<Team>();
                response.success(t);
                return ResponseEntity.ok().body(response);
            }
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<ResponseType<List<LoginUser>>> playersWithNoTeam(TeamRepository teamRepository,
            UserRepository users,
            LoginUser currentUser,
            AuthenticationService service) {
        // verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service);
        if (!isValidToken) {
            var response = new ResponseType<List<LoginUser>>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        List<User> jogadoresEmEquipas = new ArrayList<>();
        List<Team> todasEquipas = teamRepository.findAll();

        for (Team t : todasEquipas) {
            jogadoresEmEquipas.addAll(t.getPlayers());
        }
        // suposto ser pra encontrar todos os atletas
        List<User> todosJogadores = new ArrayList<>();
        for (User user : users.findAll()) {
            if (user.getRole().toString().equals("User")) {
                todosJogadores.add(user);
            }
        }
        // verificar se users vazios
        if (todosJogadores.isEmpty()) {
            var response = new ResponseType<List<LoginUser>>();
            response.error("Não existem jogadores");
            return ResponseEntity.badRequest().body(response);
        }
        todosJogadores.removeAll(jogadoresEmEquipas);
        // verificar se jogadores em equipas está vazia
        if (jogadoresEmEquipas.isEmpty()) {
            var response = new ResponseType<List<LoginUser>>();
            response.error("Não existem jogadores sem equipa");
            return ResponseEntity.badRequest().body(response);
        }
        // passe de user pra loginuser a um aux
        List<LoginUser> aux = new ArrayList<>();
        for (User user : todosJogadores) {
            LoginUser loginUser = new LoginUser();
            loginUser.setId(user.getId());
            loginUser.setFirstname(user.getFirstname());
            loginUser.setLastname(user.getLastname());
            loginUser.setEmail(user.getEmail());
            loginUser.setRole(user.getRole().toString());
            aux.add(loginUser);
        }
        var response = new ResponseType<List<LoginUser>>();
        response.success(aux);
        return ResponseEntity.ok().body(response);
    }
}