package com.example.application.controller.Game;

import com.example.application.controller.Team.TeamController;
import com.example.application.repository.PracticeRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import dev.hilla.Endpoint;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class GameController {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamController teamController;
    private final PracticeRepository practiceRepository;



}