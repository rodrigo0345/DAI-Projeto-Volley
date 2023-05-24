package com.example.application.controller.Game;

import com.example.application.controller.Team.TeamController;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Game;
import com.example.application.model.Practice;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.Roles;
import com.example.application.model.User.User;
import com.example.application.repository.GameRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.GameService;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Endpoint
@AnonymousAllowed
@AllArgsConstructor
public class GameController {

    private final GameRepository gameRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamController teamController;

    public Iterable<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public ResponseEntity<ResponseType<Game>> createGame(LocalDateTime date,
            String teamID, List<Integer> gameCall,
            String opponent, String local, LoginUser user) {

        if (!user.getRole().equals("ADMIN")) {
            var response = new ResponseType<Game>();
            response.error("Não tem permissões para criar jogo");
            return ResponseEntity.badRequest().body(response);
        }

        if (gameCall.isEmpty()
                || opponent.trim().isEmpty()
                || local.trim().isEmpty()) {
            var response = new ResponseType<Game>();
            response.error("Campos em branco");
            return ResponseEntity.badRequest().body(response);
        }

        if ((teamRepository.findById(Long.parseLong(teamID))) == null) {
            var response = new ResponseType<Game>();
            response.error("Nome de equipa inválido");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamController.isPlayerInTeam(gameCall).getBody().success) {
            var response = new ResponseType<Game>();
            response.error("Algum jogador não pertece a nenhuma equipa");
            return ResponseEntity.badRequest().body(response);
        }

        Game createdGame = GameService.createGame(gameRepository, teamRepository,
                gameCall, teamID, opponent,
                date, local).success;
        var response = new ResponseType<Game>();
        response.success(createdGame);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Game>> editGame(List<Integer> gameCall,
            String teamID,
            String opponent,
            String date,
            String local,
            Integer gameId, LoginUser user) {

        String day = date.split("T")[0];

        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime startDateTime;
        LocalDateTime endDateTime;
        try {
            startDateTime = LocalDateTime.parse(date, formatter);

        } catch (DateTimeParseException e) {
            var response = new ResponseType<Game>();
            response.error("Invalid date format");
            return ResponseEntity.badRequest().body(response);
        }


        Game game = gameRepository.findById(gameId).get();

        if (game == null) {
            var response = new ResponseType<Game>();
            response.error("Não existe jogo");
            return ResponseEntity.badRequest().body(response);
        }

        if (!user.getRole().equals("ADMIN")) {
            var response = new ResponseType<Game>();
            response.error("Não tem permissões para criar jogo");
            return ResponseEntity.badRequest().body(response);
        }

        if (gameCall.isEmpty() || opponent.trim().isEmpty() || local.trim().isEmpty()) {
            var response = new ResponseType<Game>();
            response.error("Campos em branco");
            return ResponseEntity.badRequest().body(response);
        }

        if ((teamRepository.findById(Long.parseLong(teamID))) == null) {
            var response = new ResponseType<Game>();
            response.error("Nome de equipa inválido");
            return ResponseEntity.badRequest().body(response);
        }

        if (teamController.isPlayerInTeam(gameCall).getBody().success) {
            var response = new ResponseType<Game>();
            response.error("Algum jogador não pertece a nenhuma equipa");
            return ResponseEntity.badRequest().body(response);
        }




        Game editedGame = GameService.editGame(gameRepository, teamRepository,
                gameId, teamID, opponent, startDateTime,
                local, gameCall).success;

        var response = new ResponseType<Game>();
        response.success(editedGame);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Game>> removeGame(Integer gameID,
            LoginUser loginUser) {

        Game game = gameRepository.findById(gameID).get();

        if (game == null) {
            var response = new ResponseType<Game>();
            response.error("O jogo não existe");
            return ResponseEntity.badRequest().body(response);
        }

        if (!(loginUser.getRole().equals("ADMIN"))) {
            var response = new ResponseType<Game>();
            response.error("Não tem permissoes");
            return ResponseEntity.badRequest().body(response);
        }

        Game deletedGame = GameService.removeGame(gameRepository,
                gameID).success;

        var response = new ResponseType<Game>();
        response.success(deletedGame);
        return ResponseEntity.ok().body(response);
    }
    /*
     * public ResponseEntity<ResponseType<Game>> addPlayer(List<Integer> gameCall,
     * Long gameID,
     * LoginUser loginUser) {
     * 
     * Game game = gameRepository.findById(gameID);
     * 
     * if (game == null) {
     * var response = new ResponseType<Game>();
     * response.error("Essa game nao existe");
     * return ResponseEntity.badRequest().body(response);
     * }
     * 
     * User user = userRepository.findById(loginUser.getId()).get();
     * if (!(user.getRole().equals(Roles.MANAGER) ||
     * user.equals(game.getManagerID()))) {
     * var response = new ResponseType<Game>();
     * response.error("Nao tem permissoes");
     * return ResponseEntity.badRequest().body(response);
     * }
     * 
     * if (teamController.isPlayerInTeam(gameCall).getBody().success) {
     * var response = new ResponseType<Game>();
     * response.error("Os jogadores não pertecem a uma equipa");
     * return ResponseEntity.badRequest().body(response);
     * }
     * 
     * Game addedPlayers = GameService.addPlayers(gameCall, gameID,
     * gameRepository).success;
     * 
     * var response = new ResponseType<Game>();
     * response.success(addedPlayers);
     * return ResponseEntity.ok().body(response);
     * }
     * 
     * public ResponseEntity<ResponseType<Game>> removePlayer(LoginUser loginUser,
     * Long gameId, List<Integer> gameCallId) {
     * 
     * Game game = gameRepository.findById(gameId);
     * User user = userRepository.findById(loginUser.getId()).get();
     * List<User> aRemover = null;
     * 
     * if (!(user.equals(game.getManagerID()) ||
     * user.getRole().equals(Roles.MANAGER))) {
     * var response = new ResponseType<Game>();
     * response.error("Nao tem permissoes");
     * return ResponseEntity.badRequest().body(response);
     * }
     * 
     * for (Integer elemento : gameCallId) {
     * User jogador = userRepository.findById(elemento).get();
     * aRemover.add(jogador);
     * }
     * 
     * if (game.getPlayers().contains(aRemover)) {
     * var response = new ResponseType<Game>();
     * response.error("Os jogadores não estao convocados");
     * return ResponseEntity.badRequest().body(response);
     * }
     * 
     * Game removedPlayers = GameService.removePlayers(gameCallId,
     * gameId,
     * gameRepository).success;
     * 
     * var response = new ResponseType<Game>();
     * response.success(removedPlayers);
     * return ResponseEntity.ok().body(response);
     * }
     */
}
