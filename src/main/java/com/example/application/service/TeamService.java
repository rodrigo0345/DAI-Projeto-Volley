package com.example.application.service;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Team.Escalao;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import org.springframework.http.ResponseEntity;

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

    public static ResponseType<Team> removerEquipa(TeamRepository teamRepository,
                                                   LoginUser loginUser,
                                                   Team team)
    {

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
                                                                      LoginUser currentUser,
                                                                      AuthenticationService service)
    {
        //verificar se o token é válido
        var isValidToken = TokenService.validateToken(currentUser, currentUser.getStringToken(), service).getBody();
        if (!isValidToken) {
            var response = new ResponseType<Team>();
            response.error("Token inválida");
            return ResponseEntity.badRequest().body(response);
        }
        //verificar se currentUser é admin ou treinador da equipa
        if(!(currentUser.getRole().toString().equals("MANAGER") || currentUser.getRole().toString().equals("ADMIN"))){
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

        Team aux = teamRepository.findById(team.getId());
        aux.setPlayers(team.getPlayers());

        teamRepository.save(aux);

        var response = new ResponseType<Team>();
        response.success(team);
        return ResponseEntity.ok().body(response);
    }

    public static ResponseType<List<Long>> removerJogador(TeamRepository teamRepository,
                                                          List<Long> atletas,
                                                          LoginUser loginUser,
                                                          Team team)
    {

        User user = users.findById(loginUser.getId()).get();

        if(!(user.getRole().toString().equals("MANAGER") || user.getRole().toString().equals("ADMIN"))){
            var response =  new ResponseType<List<Long>>();
            response.error("Não tem permissoes para remover jogadores");
            return response;
        }

        if(team == null){
            var response = new ResponseType<List<Long>>();
            response.error("Sem equipa selecionada");
            return response;
        }

        List<User> jogadores = null;

        for(Long elemento : atletas){
            User atleta = users.findById(elemento).get();
            jogadores.add(atleta);
        }

        if(!team.getPlayers().contains(atletas)){
            var response = new ResponseType<List<Long>>();
            response.error("Os atletaes nao pertecem a esta equipa");
            return response;
        }

        team.getPlayers().remove(jogadores);
        teamRepository.save(team);

        var response = new ResponseType<List<Long>>();
        response.success(atletas);
        return  response;
    }

    public static ResponseEntity<ResponseType<Team>> trocarTreinador(TeamRepository teamRepository,
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
        //verificar se currentUser é admin
        if (!currentUser.getRole().toString().equals("ADMIN")) {
            var response = new ResponseType<Team>();
            response.error("Você não tem permissão para editar a equipa");
            return ResponseEntity.badRequest().body(response);
        }

        Team aux = teamRepository.findById(team.getId());
        aux.setManager(team.getManager());

        teamRepository.save(aux);

        var response = new ResponseType<Team>();
        response.success(team);
        return ResponseEntity.ok().body(response);
    }
}
