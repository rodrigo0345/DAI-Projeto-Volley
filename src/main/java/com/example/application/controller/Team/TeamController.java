package com.example.application.controller.Team;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Team.Escalao;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.AuthenticationService;
import com.example.application.service.TeamService;


import com.example.application.service.TokenService;
import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Endpoint
@RequiredArgsConstructor
public class TeamController {

    public static ResponseEntity<ResponseType<Team>> criarEquipaTreinador(TeamRepository teamRepository,
                                                                UserRepository users,
                                                                LoginUser loginUser,
                                                                List<Integer> equipa,
                                                                Escalao escalao,
                                                                String name)
    {
        User user = users.findById(loginUser.getId()).get();
        if(!(user.getRole().equals((Roles.MANAGER)))){
            var response = new ResponseType<Team>();
            response.error("Não tem permissões para criar equipas");
            return ResponseEntity.badRequest().body(response);
        }
        if(equipa == null){
            var response = new ResponseType<Team>();
            response.error("A equipa esta vazia");
            return ResponseEntity.badRequest().body(response);
        }
        if(escalao == null){
            var response = new ResponseType<Team>();
            response.error("O escalão não existe");
            return ResponseEntity.badRequest().body(response);
        }

        Team createdTeam = TeamService.criarEquipaTreinador(teamRepository, loginUser, equipa, escalao, name).success;

        var response = new ResponseType<Team>();
        response.success(createdTeam);
        return ResponseEntity.ok().body(response);
    }

    public static ResponseEntity<ResponseType<Team>> editarEquipa (TeamRepository teamRepository,
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
        //verificar se a equipa é válida (nao nula)
        if (team == null) {
            var response = new ResponseType<Team>();
            response.error("A equipa não existe");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se o nome da equipa é válido (nao vazio)
        if (team.getName().trim().isEmpty() ) {
            var response = new ResponseType<Team>();
            response.error("O nome da equipa não pode ser vazio");
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

        Team editedTeam = TeamService.editarEquipa(teamRepository, team).success;

        var response = new ResponseType<Team>();
        response.success(editedTeam);
        return ResponseEntity.ok().body(response);
    }

    public static ResponseEntity<ResponseType<Team>> removerEquipa(TeamRepository teamRepository,
                                                                   UserRepository users,
                                                                   LoginUser loginUser,
                                                                   Team team)
    {
        User user = users.findById(loginUser.getId()).get();

        if(!(user.getId().equals(team.getManager().getId()) || user.getRole().equals(Roles.ADMIN))){
            var response  = new ResponseType<Team>();
            response.error = ("Não tem permissoes para remover equipas");
            return ResponseEntity.ok().body(response);
        }
        Team deletedTeam = TeamService.removerEquipa(teamRepository, team).success;

        var response = new ResponseType<Team>();
        response.success(deletedTeam);
        return ResponseEntity.ok().body(response);
    }

    public static ResponseEntity<ResponseType<Team>> adicionarJogador(TeamRepository teamRepository,
                                                                      AuthenticationService service,
                                                                      Team team,
                                                                      LoginUser currentUser)
    {
        //verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service).getBody();
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se currentUser é admin ou treinador da equipa
        if(!((currentUser.getRole().toString().equals("MANAGER")) || currentUser.getRole().toString().equals("ADMIN"))){
            var response =  new ResponseType<Team>();
            response.error("Não tem permissoes para remover jogadores");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se o jogador é valido
        if (team.getPlayers() == null) {
            var response = new ResponseType<Team>();
            response.error("O jogador não existe");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se o jogador já pertence a outra equipa
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

        Team addedPlayerTeam = TeamService.adicionarJogador(teamRepository, team).success;

        var response = new ResponseType<Team>();
        response.success(addedPlayerTeam);
        return ResponseEntity.ok().body(response);
    }

    public static ResponseEntity<ResponseType<List<Integer>>> removerJogador(TeamRepository teamRepository,
                                                                             UserRepository users,
                                                                             List<Integer> atletas,
                                                                             LoginUser loginUser,
                                                                             Team team)
    {
        User user = users.findById(loginUser.getId()).get();

        if(!(user.getRole().toString().equals("MANAGER") || user.getRole().toString().equals("ADMIN"))){
            var response =  new ResponseType<List<Integer>>();
            response.error("Não tem permissoes para remover jogadores");
            return ResponseEntity.badRequest().body(response);
        }

        if(team == null){
            var response = new ResponseType<List<Integer>>();
            response.error("Sem equipa selecionada");
            return ResponseEntity.badRequest().body(response);
        }

        List<User> jogadores = new ArrayList<>();

        for(Integer elemento : atletas){
            User atleta = users.findById(elemento).get();
            jogadores.add(atleta);
        }

        List<Integer> jogadoresARemover = new ArrayList<>();

        for (User jogador : jogadores) {
            Integer id = jogador.getId();
            jogadoresARemover.add(id);
        }

        List<User> usersARemover = new ArrayList<>();

        for(Integer elemento : atletas){
            User atleta = users.findById(elemento).get();
            usersARemover.add(atleta);
        }

        if(!team.getPlayers().contains(atletas)){
            var response = new ResponseType<List<Integer>>();
            response.error("Os atletaes nao pertecem a esta equipa");
            return ResponseEntity.badRequest().body(response);
        }

        List<User> removedPlayerTeam = TeamService.removerJogador(teamRepository, usersARemover, team).success;

        var response = new ResponseType<List<Integer>>();
        response.success(jogadoresARemover);
        return ResponseEntity.ok().body(response);
    }
    public static ResponseEntity<ResponseType<Team>> trocarTreinador(TeamRepository teamRepository,
                                                                     AuthenticationService service,
                                                                     LoginUser currentUser,
                                                                     Integer equipa)
    {
        Team team = teamRepository.findById(equipa).get();

        //verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service).getBody();
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se currentUser é admin
        if (!currentUser.getRole().equals("ADMIN")) {
            var response = new ResponseType<Team>();
            response.error("Você não tem permissão para editar a equipa");
            return ResponseEntity.badRequest().body(response);
        }

        Team changedManagerTeam = TeamService.trocarTreinador(teamRepository, team).success;

        var response = new ResponseType<Team>();
        response.success(changedManagerTeam);
        return ResponseEntity.ok().body(response);
    }
}