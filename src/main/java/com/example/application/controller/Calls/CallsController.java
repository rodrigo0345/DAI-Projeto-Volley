/*
 * package com.example.application.controller.Calls;
 * 
 * import com.example.application.controller.Team.TeamController;
 * import com.example.application.controller.Wrapper.ResponseType;
 * import com.example.application.model.Convocatorias;
 * import com.example.application.model.Team.Team;
 * import com.example.application.model.User.LoginUser;
 * import com.example.application.model.User.Roles;
 * import com.example.application.model.User.User;
 * import com.example.application.repository.ConvocatoriasRepository;
 * import com.example.application.repository.TeamRepository;
 * import com.example.application.repository.UserRepository;
 * import com.example.application.service.CallsService;
 * import org.springframework.http.ResponseEntity;
 * 
 * import java.time.LocalDateTime;
 * import java.util.HashSet;
 * import java.util.List;
 * import java.util.Set;
 * 
 * public class CallsController {
 * 
 * private final ConvocatoriasRepository convocatoriasRepository;
 * private final TeamRepository teamRepository;
 * private final UserRepository userRepository;
 * private final TeamController teamController;
 * 
 * public CallsController(ConvocatoriasRepository convocatoriasRepository,
 * TeamRepository teamRepository,
 * UserRepository userRepository, TeamController teamController) {
 * 
 * this.convocatoriasRepository = convocatoriasRepository;
 * this.teamRepository = teamRepository;
 * this.userRepository = userRepository;
 * this.teamController = teamController;
 * }
 * 
 * public ResponseEntity<ResponseType<Convocatorias>> createCall(List<Integer>
 * atletas,
 * String titulo, String description, LocalDateTime date, Integer idManager) {
 * 
 * // verificar quem ta a fazer ?? permissoes ns
 * 
 * if (atletas.isEmpty() || titulo.trim().isEmpty() ||
 * description.trim().equals(null) || idManager == null) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Campos em branco ");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * User user = userRepository.findById(idManager).get();
 * if (!(user.getRole().toString().equals("MANAGER"))) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Não é treinador");
 * return ResponseEntity.badRequest().body(response);
 * }
 * if (teamController.isPlayerInTeam(atletas).getBody().success) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Os jogadores não pertecem a uma equipa");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * Convocatorias createdCall = CallsService.createCall(convocatoriasRepository,
 * atletas, titulo, description,
 * date, idManager).success;
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(createdCall);
 * return ResponseEntity.ok().body(response);
 * }
 * 
 * public ResponseEntity<ResponseType<Convocatorias>> editCall(List<Integer>
 * atletas,
 * String titulo,
 * String description,
 * LocalDateTime date,
 * Integer idManager,
 * Long callId) {
 * 
 * Convocatorias convocatorias = convocatoriasRepository.findById(callId);
 * 
 * if (convocatorias == null) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Não existe convocatoria");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * User user = userRepository.findById(idManager).get();
 * 
 * if (user.equals(convocatorias.getManagerID())) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Não tem permissoes para editar");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * if (atletas.isEmpty() || titulo.trim().isEmpty() ||
 * description.trim().isEmpty() || idManager == null) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Campos em branco");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * if (!(user.getRole().equals((Roles.MANAGER)))) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Não é treinador");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * if (teamController.isPlayerInTeam(atletas).getBody().success) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Os jogadores não pertecem a uma equipa");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * Convocatorias editedCall = CallsService.editCall(convocatoriasRepository,
 * callId, titulo, description, date,
 * idManager, atletas).success;
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(editedCall);
 * return ResponseEntity.ok().body(response);
 * }
 * 
 * public ResponseEntity<ResponseType<Convocatorias>> removeCall(Long
 * convocatoriaID,
 * LoginUser loginUser) {
 * 
 * Convocatorias convocatoria =
 * convocatoriasRepository.findById(convocatoriaID);
 * 
 * if (convocatoria == null) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("A convocatoria nao existe");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * User user = userRepository.findById(loginUser.getId()).get();
 * 
 * if (!(user.getRole().equals(Roles.MANAGER) ||
 * user.equals(convocatoria.getManagerID()))) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Não tem permissoes");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * Convocatorias deletedCall = CallsService.removeCall(convocatoriasRepository,
 * convocatoriaID).success;
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(deletedCall);
 * return ResponseEntity.ok().body(response);
 * }
 * 
 * public ResponseEntity<ResponseType<Convocatorias>> addPlayer(List<Integer>
 * atletas, Long convocatoriaID,
 * LoginUser loginUser) {
 * 
 * Convocatorias convocatoria =
 * convocatoriasRepository.findById(convocatoriaID);
 * 
 * if (convocatoria == null) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Essa convocatoria nao existe");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * User user = userRepository.findById(loginUser.getId()).get();
 * if (!(user.getRole().equals(Roles.MANAGER) ||
 * user.equals(convocatoria.getManagerID()))) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Nao tem permissoes");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * if (teamController.isPlayerInTeam(atletas).getBody().success) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Os jogadores não pertecem a uma equipa");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * Convocatorias addedPlayers = CallsService.addPlayers(atletas, convocatoriaID,
 * convocatoriasRepository).success;
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(addedPlayers);
 * return ResponseEntity.ok().body(response);
 * }
 * 
 * public ResponseEntity<ResponseType<Convocatorias>> removePlayer(LoginUser
 * loginUser,
 * Long convocatoriaId, List<Integer> atletasId) {
 * 
 * Convocatorias convocatorias =
 * convocatoriasRepository.findById(convocatoriaId);
 * User user = userRepository.findById(loginUser.getId()).get();
 * List<User> aRemover = null;
 * 
 * if (!(user.equals(convocatorias.getManagerID()) ||
 * user.getRole().equals(Roles.MANAGER))) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Nao tem permissoes");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * for (Integer elemento : atletasId) {
 * User jogador = userRepository.findById(elemento).get();
 * aRemover.add(jogador);
 * }
 * 
 * if (convocatorias.getPlayers().contains(aRemover)) {
 * var response = new ResponseType<Convocatorias>();
 * response.error("Os jogadores não estao convocados");
 * return ResponseEntity.badRequest().body(response);
 * }
 * 
 * Convocatorias removedPlayers = CallsService.removePlayers(atletasId,
 * convocatoriaId,
 * convocatoriasRepository).success;
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(removedPlayers);
 * return ResponseEntity.ok().body(response);
 * }
 * 
 * }
 */