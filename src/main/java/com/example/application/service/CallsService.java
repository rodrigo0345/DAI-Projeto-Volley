package com.example.application.service;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Convocatorias;
import com.example.application.model.User.User;
import com.example.application.repository.ConvocatoriasRepository;
import com.example.application.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

public class CallsService {
    private static UserRepository usersRepository;
    public static ResponseType<Convocatorias> createCall(ConvocatoriasRepository convocatoriasRepository,
                                                         List<Long> equipa,
                                                         String titulo,
                                                         String description,
                                                         LocalDateTime date,
                                                         Long managerId) {

        List<User> atletas = null;

        for(Long elemento : equipa){
            User atleta = usersRepository.findById(elemento).get();
            atletas.add(atleta);
        }

        User manager = usersRepository.findById(managerId).get();
        //managerId no model é user???

        Convocatorias call = new Convocatorias();
        call.setTitle(titulo);
        call.setDescription(description);
        call.setDate(date);
        call.setManagerID(manager);
        call.setPlayers(atletas);

        convocatoriasRepository.save(call);

        var response = new ResponseType<Convocatorias>();
        response.success(call);
        return response;
    }

    public static ResponseType<Convocatorias> editCall(ConvocatoriasRepository convocatoriasRepository,
                                                       Long callId,
                                                       String titulo,
                                                       String description,
                                                       LocalDateTime date,
                                                       Long managerId,
                                                       List<Long> equipa) {

        List<User> atletas = null;

        for(Long elemento : equipa){
            User atleta = usersRepository.findById(elemento).get();
            atletas.add(atleta);
        }

        User manager = usersRepository.findById(managerId).get();

        Convocatorias call = convocatoriasRepository.findById(callId);

        call.setTitle(titulo);
        call.setDescription(description);
        call.setDate(date);
        call.setManagerID(manager);
        call.setPlayers(atletas);

        convocatoriasRepository.save(call);

        var response = new ResponseType<Convocatorias>();
        response.success(call);
        return response;
    }

    public static ResponseType<Convocatorias> removeCall(ConvocatoriasRepository convocatoriasRepository,
                                                         Long callId) {

        Convocatorias call = convocatoriasRepository.findById(callId);

        convocatoriasRepository.delete(call);

        var response = new ResponseType<Convocatorias>();
        response.success(call);
        return response;
    }



    public static void addPlayer(ConvocatoriasRepository convocatoriasRepository) {

    }

    public static void removePlayer(ConvocatoriasRepository convocatoriasRepository) {

    }
}
