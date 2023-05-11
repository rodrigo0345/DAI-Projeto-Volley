/*
 * package com.example.application.service;
 * 
 * import com.example.application.controller.Wrapper.ResponseType;
 * import com.example.application.model.Convocatorias;
 * import com.example.application.model.User.User;
 * import com.example.application.repository.ConvocatoriasRepository;
 * import com.example.application.repository.UserRepository;
 * import io.swagger.models.auth.In;
 * 
 * import java.time.LocalDateTime;
 * import java.util.List;
 * 
 * public class CallsService {
 * private static UserRepository usersRepository;
 * 
 * public static ResponseType<Convocatorias> createCall(ConvocatoriasRepository
 * convocatoriasRepository,
 * List<Integer> equipa,
 * String titulo,
 * String description,
 * LocalDateTime date,
 * Integer managerId) {
 * 
 * List<User> atletas = null;
 * 
 * for (Integer elemento : equipa) {
 * User atleta = usersRepository.findById(elemento).get();
 * atletas.add(atleta);
 * }
 * 
 * User manager = usersRepository.findById(managerId).get();
 * // managerId no model é user???
 * 
 * Convocatorias call = new Convocatorias();
 * call.setTitle(titulo);
 * call.setDescription(description);
 * call.setDate(date);
 * call.setManagerID(manager);
 * call.setPlayers(atletas);
 * 
 * convocatoriasRepository.save(call);
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(call);
 * return response;
 * }
 * 
 * public static ResponseType<Convocatorias> editCall(ConvocatoriasRepository
 * convocatoriasRepository,
 * Long callId,
 * String titulo,
 * String description,
 * LocalDateTime date,
 * Integer managerId,
 * List<Integer> equipa) {
 * 
 * List<User> atletas = null;
 * 
 * for (Integer elemento : equipa) {
 * User atleta = usersRepository.findById(elemento).get();
 * atletas.add(atleta);
 * }
 * 
 * User manager = usersRepository.findById(managerId).get();
 * 
 * Convocatorias call = convocatoriasRepository.findById(callId);
 * 
 * call.setTitle(titulo);
 * call.setDescription(description);
 * call.setDate(date);
 * call.setManagerID(manager);
 * call.setPlayers(atletas);
 * 
 * convocatoriasRepository.save(call);
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(call);
 * return response;
 * }
 * 
 * public static ResponseType<Convocatorias> removeCall(ConvocatoriasRepository
 * convocatoriasRepository,
 * Long callId) {
 * 
 * Convocatorias call = convocatoriasRepository.findById(callId);
 * 
 * convocatoriasRepository.delete(call);
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(call);
 * return response;
 * }
 * 
 * public static ResponseType<Convocatorias> addPlayers(List<Integer> atletasID,
 * Long convocatoriaID,
 * ConvocatoriasRepository convocatoriasRepository) {
 * 
 * Convocatorias call = convocatoriasRepository.findById(convocatoriaID);
 * 
 * List<User> atletas = call.getPlayers();
 * 
 * for (Integer elemento : atletasID) {
 * User atleta = usersRepository.findById(elemento).get();
 * atletas.add(atleta);
 * }
 * 
 * call.setPlayers(atletas);
 * 
 * convocatoriasRepository.save(call);
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(call);
 * return response;
 * }
 * 
 * public static ResponseType<Convocatorias> removePlayers(List<Integer>
 * atletasID, Long convocatoriaID,
 * ConvocatoriasRepository convocatoriasRepository) {
 * 
 * Convocatorias call = convocatoriasRepository.findById(convocatoriaID);
 * 
 * List<User> atletas = call.getPlayers();
 * 
 * for (Integer elemento : atletasID) {
 * User atleta = usersRepository.findById(elemento).get();
 * atletas.remove(atleta);
 * }
 * 
 * call.setPlayers(atletas);
 * 
 * convocatoriasRepository.save(call);
 * 
 * var response = new ResponseType<Convocatorias>();
 * response.success(call);
 * return response;
 * }
 * }
 */