package com.example.application.controller.Calendar;

import java.util.ArrayList;
import java.util.List;

import com.example.application.config.RequiredArgsConstructor;
import com.example.application.model.Practice;
import com.example.application.repository.PhysicalAppointmentRepository;
import com.example.application.repository.GameRepository;
import com.example.application.repository.NewsRepository;
import com.example.application.repository.PracticeRepository;
import com.example.application.repository.RideRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.CalendarService;
import com.example.application.service.CalendarService.Event;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.vaadin.open.App;

import dev.hilla.Endpoint;
import lombok.AllArgsConstructor;

@Endpoint
@AnonymousAllowed
@AllArgsConstructor
@RequiredArgsConstructor
public class CalendarController {
    private final RideRepository ridesRepository;

    private final NewsRepository newsRepository;

    private final UserRepository usersRepository;

    private final GameRepository calendarRepository;

    private final PracticeRepository practiceRepository;

    private final PhysicalAppointmentRepository appointmentRepository;

    private final GameRepository gameRepository;

    private final TeamRepository teamRepository;

    public List<Event> getAllEvents() {
        var events = CalendarService.getAllEvents(ridesRepository, newsRepository, calendarRepository,
                practiceRepository,
                appointmentRepository);
        return events;
    }

    public List<Event> getEventsByPerson(Integer id) {
        var events = CalendarService.getEventsByUser(id, ridesRepository, newsRepository, gameRepository,
                practiceRepository, appointmentRepository, usersRepository, teamRepository);
        return events;
    }

    public List<Event> getAllTrainingEvents(Practice practice) {
        List<Event> events = CalendarService.getAllTrainingEvents(ridesRepository, newsRepository, gameRepository,
                practiceRepository, appointmentRepository);
        return events;
    }
}
