package com.example.application.service;

import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.model.CalendarEvent;
import com.example.application.model.Ride;
import com.example.application.model.News.News;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;
import com.example.application.repository.CalendarRepository;
import com.example.application.repository.UserRepository;

public class CalendarService {
    public static boolean createEvent(CalendarRepository calendarRepository, PostType post) {
        CalendarEvent event = new CalendarEvent();
        if (post.getType().equals("ride")) {
            Ride ride = post.returnType();
            event.setStartDate(ride.startDate);

            // default duration is 2 hours (No idea why)
            event.setEndDate(ride.startDate.plusHours(2));
            event.setLinkToPost("/post/ride/" + ride.getId());
            event.setTitle("Boleia para" + ride.getDestination());
            event.setDescription(ride.getDescription());
            event.setDescription(ride.getDescription());

        } else {
            return false;
        }

        try {
            calendarRepository.save(event);
        } catch (Exception e) {
            return false;
        }

        return true;
    }

    // it is easier to just provide the hole PostType
    public static boolean deleteEvent(CalendarRepository calendarRepository, PostType post) {
        if (post.getType().equals("ride")) {
            Ride ride = post.returnType();
            Integer id = ride.getId() != null ? ride.getId().intValue() : null;
            try {
                calendarRepository.deleteById(id);
            } catch (Exception e) {
                return false;
            }

            return true;
        }
        return false;
    }

    public static boolean subscribeEvent(CalendarRepository calendarRepository, UserRepository usersRepository,
            Integer id) {
        CalendarEvent event = calendarRepository.findById(id).get();
        if (event == null) {
            return false;
        }

        User user = usersRepository.findById(id).get();
        if (user == null) {
            return false;
        }

        user.setPassword("");

        // join the invited
        event.getInvited().add(user);

        try {
            calendarRepository.save(event);
        } catch (Exception e) {
            return false;
        }

        return true;
    }

    public static boolean unsubscribeEvent(CalendarRepository calendarRepository, Integer userId, Integer eventId) {
        CalendarEvent event = calendarRepository.findById(eventId).get();
        if (event == null) {
            return false;
        }

        User invited = null;
        for (User user : event.getInvited()) {
            if (user.getId().equals(userId)) {
                invited = user;
                break;
            }
        }

        if (invited == null) {
            return false;
        }

        invited.setPassword("");

        // remove the invited
        event.getInvited().remove(invited);

        try {
            calendarRepository.save(event);
        } catch (Exception e) {
            return false;
        }

        return true;
    }
}
