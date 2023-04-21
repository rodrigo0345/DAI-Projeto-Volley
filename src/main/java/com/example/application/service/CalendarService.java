package com.example.application.service;

import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.model.CalendarEvent;
import com.example.application.model.Ride;
import com.example.application.model.News.News;
import com.example.application.repository.CalendarRepository;

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
}
