package com.example.application.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.application.controller.Forum.Wrappers.PostSavedType;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.model.Appointment;
import com.example.application.model.Game;
import com.example.application.model.Practice;
import com.example.application.model.Ride;
import com.example.application.model.News.News;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.UserRepository;

public class CalendarService {

    public static class Event {
        public String title;
        public String url;
        public LocalDateTime date;
    }

    public static List<Event> getAllEvents() {
        List<PostType> posts = fetchPosts();
        List<Event> events = new ArrayList<>();
        posts.forEach(el -> {
            var event = new Event();
            PostSavedType type = el.getType();

            switch (type) {
                case NEWS:
                    break;
                case RIDE:
                    Ride ride = el.returnType();
                    event.title = ride.getOrigin() + " -> " + ride.getDestination();
                    event.url = "/ride/" + ride.getId();
                    event.date = ride.getStartDate();
                    break;
                case GAME:
                    // ACABAR ISTO
                    Game game = el.returnType();
                    event.title = "Matosinhos contra Odivelas";
                    event.url = "/game/" + 0;
                    event.date = null;
                    break;
                case PRACTICE:
                    Practice practice = el.returnType();
                    event.title = "Treino " + practice.getTeam();
                    event.url = "/practice/" + practice.getId();
                    event.date = practice.getStartDate();
                    break;
                case APPOINTMENT:
                    Appointment appointment = el.returnType();
                    event.title = "Consulta " + "Dr. " + "Joao";
                    event.url = "/appointment/" + 0;
                    event.date = null;
                    break;
                default:
                    break;
            }
            events.add(event);
        });

        return events;
    }

    // nada eficiente
    private static List<PostType> fetchPosts() {
        // fetch all the data
    }

}
