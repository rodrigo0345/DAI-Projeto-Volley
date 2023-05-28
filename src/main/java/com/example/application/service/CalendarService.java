package com.example.application.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.example.application.controller.Forum.Wrappers.PostSavedType;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.model.Appointments.PhysicalAppointment;
import com.example.application.model.Game;
import com.example.application.model.Practice;
import com.example.application.model.Ride;
import com.example.application.model.News.News;
import com.example.application.model.Team.Team;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.PhysicalAppointmentRepository;
import com.example.application.repository.GameRepository;
import com.example.application.repository.NewsRepository;
import com.example.application.repository.PracticeRepository;
import com.example.application.repository.RideRepository;
import com.example.application.repository.TeamRepository;
import com.example.application.repository.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CalendarService {

    public static class Event {
        public String title;
        public String url;
        public LocalDateTime date;
    }

    public static List<Event> getAllEvents(RideRepository rideRepo, NewsRepository newsRepo,
            GameRepository gameRepo, PracticeRepository practiceRepo, PhysicalAppointmentRepository appointmentRepo,
            TeamRepository teamRepo) {

        List<PostType> posts = fetchPosts(rideRepo, newsRepo, gameRepo, practiceRepo, appointmentRepo);
        List<Event> events = new ArrayList<>();

        posts.forEach(el -> {
            var event = new Event();
            PostSavedType type = el.getType();

            switch (type) {
                case RIDE:
                    Ride ride = el.returnType();
                    event.title = ride.getOrigin() + " -> " + ride.getDestination();
                    event.url = "post/ride/" + ride.getId();
                    event.date = ride.getStartDate();
                    break;
                case GAME:
                    Game game = el.returnType();
                    event.title = game.getTeam() + " vs " + game.getOpponent();
                    event.url = "post/game/" + game.getId();
                    event.date = game.getDate();
                    break;
                case PRACTICE:
                    // TODO ACABAR ISTO
                    Practice practice = el.returnType();
                    Team team = teamRepo.findById(practice.getTeam());

                    if (team == null)
                        break;

                    event.title = "Treino " + team.getName();
                    event.url = "post/practice/" + practice.getId();
                    event.date = practice.getStartDate();
                    break;
                default:
                    break;
            }
            events.add(event);
        });

        return events;
    }

    public static List<Event> getAllTrainingEvents(RideRepository rideRepo, NewsRepository newsRepo,
            GameRepository gameRepo, PracticeRepository practiceRepo,
            PhysicalAppointmentRepository appointmentRepo) {

        List<PostType> posts = fetchPosts(rideRepo, newsRepo, gameRepo, practiceRepo, appointmentRepo);
        List<Event> events = new ArrayList<>();

        posts.forEach(el -> {
            var event = new Event();
            PostSavedType type = el.getType();

            if (Objects.requireNonNull(type) == PostSavedType.PRACTICE) {
                Practice practice = el.returnType();
                // TODO CHECK IF USER IS IN THE PRACTICE
                event.title = "Treino " + practice.getTeam();
                event.url = "post/practice/" + practice.getId();
                event.date = practice.getStartDate();
                events.add(event);
            }

        });

        return events;
    }

    public static List<Event> getEventsByUser(Integer id, RideRepository rideRepo, NewsRepository newsRepo,
            GameRepository gameRepo, PracticeRepository practiceRepo, PhysicalAppointmentRepository appointmentRepo,
            UserRepository usersRepo, TeamRepository teamRepo) {
        List<PostType> posts = fetchPosts(rideRepo, newsRepo, gameRepo, practiceRepo, appointmentRepo);
        List<Event> events = new ArrayList<>();

        posts.forEach(el -> {
            var event = new Event();
            PostSavedType type = el.getType();

            switch (type) {
                case NEWS:
                    break;
                case RIDE:
                    Ride ride = el.returnType();
                    if (ride.getDriverID() != id && !ride.getPassengers().contains(id)) {
                        break;
                    }
                    event.title = ride.getOrigin() + " -> " + ride.getDestination();
                    event.url = "/post/ride/" + ride.getId();
                    event.date = ride.getStartDate();
                    break;
                case GAME:
                    Game game = el.returnType();

                    if (!(game.getGameCall().contains(id)))
                        break;

                    event.title = "Jogo contra" + game.getOpponent();
                    event.url = "post/game/" + game.getId();
                    event.date = game.getDate();
                    break;
                case PRACTICE:
                    Practice practice = el.returnType();
                    Team team = teamRepo.findById(practice.getTeam());

                    if (team == null)
                        break;

                    if (!(team.getPlayers().contains(id) || team.getManagerID().equals(id)))
                        break;

                    event.title = "Treino " + team.getName();
                    event.url = "post/practice/" + practice.getId();
                    event.date = practice.getStartDate();
                    break;
                /*
                 * case APPOINTMENT:
                 * Appointment appointment = el.returnType();
                 * 
                 * if( !(appointment.getPatient().equals(id)) ) break;
                 * 
                 * event.title = "Consulta " + "Dr. " + "Joao";
                 * event.url = "post/appointment/" + 0;
                 * event.date = null;
                 * break;
                 */
                default:
                    break;
            }
            events.add(event);
        });

        return events;
    }

    // nada eficiente, threads?
    private static List<PostType> fetchPosts(RideRepository rideRepo, NewsRepository newsRepo,
            GameRepository gameRepo, PracticeRepository practiceRepo, PhysicalAppointmentRepository appointmentRepo) {
        // fetch all the data

        RetrieveNews news = new RetrieveNews();
        news.run(newsRepo);

        RetrieveRides rides = new RetrieveRides();
        rides.run(rideRepo);

        RetrieveGames games = new RetrieveGames();
        games.run(gameRepo);

        RetrievePractices practices = new RetrievePractices();
        practices.run(practiceRepo);

        /*
         * RetrieveAppointments appointments = new RetrieveAppointments();
         * appointments.run(appointmentRepo);
         */

        List<PostType> posts = new ArrayList<>();

        try {
            news.join();
            rides.join();
            games.join();
            practices.join();
            // appointments.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        posts.addAll(news.getResult());
        posts.addAll(rides.getResult());
        posts.addAll(games.getResult());
        posts.addAll(practices.getResult());
        // posts.addAll(appointments.getResult());

        return posts;
    }

    public static class RetrieveNews extends Thread {
        List<PostType> result = new ArrayList<>();

        public void run(NewsRepository newsRepository) {
            newsRepository.findAll().forEach(el -> {
                var post = new PostType();
                post.news = el;
                result.add(post);
            });
        }

        public List<PostType> getResult() {
            return this.result;
        }
    }

    public static class RetrieveRides extends Thread {
        List<PostType> result = new ArrayList<>();

        public void run(RideRepository rideRepository) {
            rideRepository.findAll().forEach(el -> {
                var post = new PostType();
                post.ride = el;
                result.add(post);
            });
        }

        public List<PostType> getResult() {
            return this.result;
        }
    }

    public static class RetrieveGames extends Thread {
        List<PostType> result = new ArrayList<>();

        public void run(GameRepository gameRepository) {
            gameRepository.findAll().forEach(el -> {
                var post = new PostType();
                post.game = el;
                result.add(post);
            });
        }

        public List<PostType> getResult() {
            return this.result;
        }
    }

    public static class RetrievePractices extends Thread {
        List<PostType> result = new ArrayList<>();

        public void run(PracticeRepository practiceRepository) {
            practiceRepository.findAll().forEach(el -> {
                var post = new PostType();
                post.practice = el;
                result.add(post);
            });
        }

        public List<PostType> getResult() {
            return this.result;
        }
    }

    /*
     * public static class RetrieveAppointments extends Thread {
     * List<PostType> result = new ArrayList<>();
     * 
     * public void run(AppointmentRepository appointmentRepository) {
     * appointmentRepository.findAll().forEach(el -> {
     * var post = new PostType();
     * post.appointment = el;
     * result.add(post);
     * });
     * }
     * 
     * public List<PostType> getResult() {
     * return this.result;
     * }
     * }
     */

}
