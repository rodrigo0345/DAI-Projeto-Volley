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

    private UserRepository users;
    public static void criarEquipaTreinador(TeamRepository teamRepository, List<User> list , LoginUser loginUser, String escalao, String name) {

        User user = users.findById(loginUser.getId());
        if(!(user.getRole().equals("MANAGER"))){
            var response = new ResponseType<>();
            response.error("Não é treinador");
            return;
        }
        if(list == null){
            var response = new ResponseType<>();
            response.error("Não existe jogadores");
        }

        if(!(escalao == null)){
            var role = Escalao.valueOf(escalao);

        }

        Team team = new Team();
        team.setName(name);
        team.setPlayers(list);
        team.setManager(user);
        team.setEscalao(escalao);




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
