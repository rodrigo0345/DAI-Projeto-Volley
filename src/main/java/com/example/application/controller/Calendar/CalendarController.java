package com.example.application.controller.Calendar;

import java.util.List;

import com.example.application.config.RequiredArgsConstructor;
import com.example.application.repository.AppointmentRepository;
import com.example.application.repository.GameRepository;
import com.example.application.repository.NewsRepository;
import com.example.application.repository.PracticeRepository;
import com.example.application.repository.RideRepository;
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

    private final AppointmentRepository appointmentRepository;

    private final GameRepository gameRepository;

    public List<Event> getAllEvents() {
        var events = CalendarService.getAllEvents(ridesRepository, newsRepository, calendarRepository,
                practiceRepository,
                appointmentRepository);
        return events;
    }

    public List<Event> getEventsByPerson(Integer id) {
        var events = CalendarService.getEventsByUser(id, ridesRepository, newsRepository, gameRepository,
                practiceRepository,
                appointmentRepository);
        return events;
    }
}
