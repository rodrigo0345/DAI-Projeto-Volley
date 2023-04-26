package com.example.application.controller.Calls;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Convocatorias;
import com.example.application.model.Team.Team;
import com.example.application.repository.ConvocatoriasRepository;
import com.example.application.repository.TeamRepository;
import org.springframework.http.ResponseEntity;

public class CallsController {

    public static ResponseEntity<Convocatorias> criarConvocatoria(ConvocatoriasRepository convocatoriasRepository, TeamRepository teamRepository,
                                                                  ) {
        Convocatorias convocatorias = null;


        var response = new ResponseType<Team>();
        response.success(convocatorias);
        return ResponseEntity.ok().body(response);

    }



}
