package com.example.application.service;

import com.example.application.controller.Team.TeamController;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Game;
import com.example.application.model.User.User;
import com.example.application.repository.GameRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import io.swagger.models.auth.In;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GameService {

  public static ResponseType<Game>
  createGame(GameRepository gameRepository, TeamRepository teamRepository,
             List<Integer> gamecall, String teamID, String opponent,
             LocalDateTime date, String local) {

    Game game = new Game();
    game.setDate(date);
    game.setTeam((teamRepository.findById(Long.parseLong(teamID))).getName());
    game.setGameCall(gamecall);
    game.setOpponent(opponent);
    game.setLocal(local);

    gameRepository.save(game);

    var response = new ResponseType<Game>();
    response.success(game);
    return response;
  }

  public static ResponseType<Game>
  editGame(GameRepository gameRepository, TeamRepository teamRepository,
           Integer gameId, String teamID, String opponent, LocalDateTime date,
           String local, List<Integer> gamecall) {

    Game game = gameRepository.findById(gameId).get();

    game.setDate(date);
    game.setTeam((teamRepository.findById(Long.parseLong(teamID))).getName());
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
   * public static ResponseType<Game> removePlayers(List<Integer> atletasID,
   * Long convocatoriaID, GameRepository gameRepository) {
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
