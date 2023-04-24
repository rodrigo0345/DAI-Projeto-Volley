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

import java.util.List;

public class TeamService {
    private UserController userController;

    private static UserRepository users;
    public static ResponseType<Team> criarEquipaTreinador(TeamRepository teamRepository, List<User> equipa , LoginUser loginUser, Escalao escalao, String name) {

        User user = users.findById(loginUser.getId()).get();
        if(!(user.getRole().equals("MANAGER"))){
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




    public static void editarEquipa(TeamRepository teamRepository) {
        // façam isto
    }

    public static void removerEquipa(TeamRepository teamRepository) {

    }

    public static void adicionarJogador(TeamRepository teamRepository) {

    }

    public static void removerJogador(TeamRepository teamRepository) {

    }

    public static void trocarTreinador(TeamRepository teamRepository) {

    }

}
