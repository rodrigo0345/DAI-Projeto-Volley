package com.example.application.service;

import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.controller.Users.UserController;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Team.Escalao;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.AuthenticationService;
import org.springframework.http.ResponseEntity;

import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class TeamService {

    private static UserRepository users;
    public static ResponseType<Team> criarEquipaTreinador(TeamRepository teamRepository,
                                                          List<User> equipa,
                                                          LoginUser loginUser,
                                                          Escalao escalao,
                                                          String name)
    {
        User user = users.findById(loginUser.getId()).get();
        if(!(user.getRole().toString().equals("MANAGER"))){
            var response = new ResponseType<Team>();
            response.error("Não é treinador");
            return response;
        }
        if(equipa == null){
            var response = new ResponseType<Team>();
            response.error("Não existe jogadores");
            return response;
        }

        if(escalao == null){
            var response = new ResponseType<Team>();
            response.error("O escalão esta vazio");
            return response;
        }

        Team team = new Team();
        team.setName(name);
        team.setPlayers(equipa);
        team.setManager(user);
        team.setEscalao(escalao);

        var response = new ResponseType<Team>();
        response.success(team);
        return  response;

    }




    public static ResponseEntity<ResponseType<Team>> editarEquipa(TeamRepository teamRepository,
                                                                  UserRepository users,
                                                                  AuthenticationService service,
                                                                  LoginUser currentUser,
                                                                  Team team)
    {
        //verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service).getBody();
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se currentUser é admin ou treinador da equipa
        if (!currentUser.getRole().toString().equals("ADMIN") && !currentUser.getId().equals(team.getManager().getId())) {
            var response = new ResponseType<Team>();
            response.error("Você não tem permissão para editar a equipa");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se o nome da equipa é válido (nao vazio)
        if (team.getName().trim().isEmpty() ) {
            var response = new ResponseType<Team>();
            response.error("O nome da equipa não pode ser vazio");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se a equipa é válida (nao nula)
        if (team == null) {
            var response = new ResponseType<Team>();
            response.error("A equipa não existe");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se o nome da equipa editada já existe (overlap) VERIFICA POR FIRST LASTNAME, DEPENDE DE FRONTEND?
        if (teamRepository.findByName(team.getName()) != null && !teamRepository.findByName(team.getName()).equals(team)) {
            var response = new ResponseType<Team>();
            response.error("O nome da equipa já existe");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se o nome do treinador é válido (nao vazio) MESMA CENA DE CIMA IDK BRO
        if (team.getManager().getFirstname().trim().isEmpty() || team.getManager().getLastname().trim().isEmpty()) {
            var response = new ResponseType<Team>();
            response.error("O nome do treinador não pode ser vazio");
            return ResponseEntity.badRequest().body(response);
        }

        //fazer update da equipa
        Team aux = teamRepository.findById(team.getId());
        aux.setEscalao(team.getEscalao());
        aux.setName(team.getName());
        aux.setManager(team.getManager());
        aux.setPlayers(team.getPlayers());

        teamRepository.save(aux);

        var response = new ResponseType<Team>();
        response.success(team);
        return ResponseEntity.ok().body(response);
    }

    public static ResponseType<Team> removerEquipa(TeamRepository teamRepository, LoginUser loginUser, Team team) {

        User user = users.findById(loginUser.getId()).get();


        if(!(user.getId() == team.getManager().getId() || user.getRole().equals("ADMIN"))){
            var response  = new ResponseType<Team>();
            response.error = ("Não tem permissoes para remover equipas");
            return response;
        }

            teamRepository.delete(team);
            var response = new ResponseType<Team>();

           response.success(team);
           return response;

    }

    public static ResponseEntity<ResponseType<Team>> adicionarJogador(TeamRepository teamRepository,
                                                                      Team team,
                                                                      UserRepository users)
    {
        Set<User> jogadoresEmEquipas = new HashSet<>();
        List<Team> todasEquipas = teamRepository.findAll();

        for (Team t : todasEquipas) {
            jogadoresEmEquipas.addAll(t.getPlayers());
        }

        for (User user : team.getPlayers()) {
            if (jogadoresEmEquipas.contains(user)) {
                var response = new ResponseType<Team>();
                response.error(user.getFirstname() + " " + user.getLastname() + " já pertence a outra equipa");
                return ResponseEntity.badRequest().body(response);
            }
        }

        Team aux = teamRepository.findById(team.getId());
        aux.setPlayers(team.getPlayers());

        teamRepository.save(aux);

        var response = new ResponseType<Team>();
        response.success(team);
        return ResponseEntity.ok().body(response);
    }

    public static void removerJogador(TeamRepository teamRepository) {

    }

    public static void trocarTreinador(TeamRepository teamRepository) {

    }

}
