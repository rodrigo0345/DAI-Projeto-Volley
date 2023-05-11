package com.example.application.controller.Calendar;

import com.example.application.config.RequiredArgsConstructor;
import com.example.application.model.CalendarEvent;
import com.example.application.repository.CalendarRepository;
import com.example.application.repository.NewsRepository;
import com.example.application.repository.RideRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.CalendarService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import java.util.List;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class CalendarController {
  private final RideRepository ridesRepository;

  private final NewsRepository newsRepository;

  private final UserRepository usersRepository;

  private final CalendarRepository calendarRepository;

  public CalendarController(RideRepository ridesRepository,
                            NewsRepository newsRepository,
                            UserRepository usersRepository,
                            CalendarRepository calendarRepository) {
    this.ridesRepository = ridesRepository;
    this.newsRepository = newsRepository;
    this.usersRepository = usersRepository;
    this.calendarRepository = calendarRepository;
  }

  public List<CalendarEvent> getAllEvents() {
    return CalendarService.getAllEvents(calendarRepository);
  }
}
