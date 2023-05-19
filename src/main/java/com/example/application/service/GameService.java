package com.example.application.service;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Game;
import com.example.application.model.User.User;
import com.example.application.repository.GameRepository;
import com.example.application.repository.UserRepository;
import io.swagger.models.auth.In;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class GameService {

    private static UserRepository usersRepository;

    public static ResponseType<Game> createGame(GameRepository gameRepository,
            List<Integer> gamecall,
            String team,
            String opponent,
            LocalDateTime date,
            String local) {

        Game game = new Game();
        game.setDate(date);
        game.setTeam(team);
        game.setGameCall(gamecall);
        game.setOpponent(opponent);
        game.setLocal(local);

        gameRepository.save(game);

        var response = new ResponseType<Game>();
        response.success(game);
        return response;
    }

    public static ResponseType<Game> editGame(GameRepository gameRepository,
            Integer gameId,
            String team,
            String opponent,
            LocalDateTime date,
            String local,
            List<Integer> gamecall) {

        Game game = gameRepository.findById(gameId).get();

        game.setDate(date);
        game.setTeam(team);
        game.setGameCall(gamecall);
        game.setOpponent(opponent);
        game.setLocal(local);

        gameRepository.save(game);

        var response = new ResponseType<Game>();
        response.success(game);
        return response;
    }

    public static ResponseType<Game> removeGame(GameRepository gameRepository,
            Integer gameId) {

        Game game = gameRepository.findById(gameId).get();

        gameRepository.delete(game);

        var response = new ResponseType<Game>();
        response.success(game);
        return response;
    }
    /*
     * public static ResponseType<Game> addPlayers(List<Integer> atletasID,
     * Long convocatoriaID,
     * GameRepository gameRepository) {
     * 
     * Game game = gameRepository.findById(convocatoriaID);
     * 
     * List<User> atletas = game.getPlayers();
     * 
     * for (Integer elemento : atletasID) {
     * User atleta = usersRepository.findById(elemento).get();
     * atletas.add(atleta);
     * }
     * 
     * game.setPlayers(atletas);
     * 
     * gameRepository.save(game);
     * 
     * var response = new ResponseType<Game>();
     * response.success(game);
     * return response;
     * }
     * 
     * public static ResponseType<Game> removePlayers(List<Integer> atletasID, Long
     * convocatoriaID,
     * GameRepository gameRepository) {
     * 
     * Game game = gameRepository.findById(convocatoriaID);
     * 
     * List<User> atletas = game.getPlayers();
     * 
     * for (Integer elemento : atletasID) {
     * User atleta = usersRepository.findById(elemento).get();
     * atletas.remove(atleta);
     * }
     * 
     * game.setPlayers(atletas);
     * 
     * gameRepository.save(game);
     * 
     * var response = new ResponseType<Game>();
     * response.success(game);
     * return response;
     * }
     */
}
