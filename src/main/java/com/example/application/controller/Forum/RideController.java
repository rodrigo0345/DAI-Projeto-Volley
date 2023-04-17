package com.example.application.controller.Forum;

import com.example.application.model.Ride;
import com.example.application.repository.RideRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.ArrayList;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class RideController {

    private final RideRepository rides;

    public RideController(RideRepository rides) {
        this.rides = rides;
    }

    public @Nonnull Iterable<Ride> findAll() throws Exception {
        Iterable<Ride> ridesAux = rides.findAll();
        List<Ride> ridesList = new ArrayList<>();
        for (Ride ride : ridesAux) {
            ridesList.add(
                    new Ride(
                            ride.getId(),
                            ride.getOrigin(),
                            ride.getDestination(),
                            ride.getStartDate(),
                            ride.getSeats(),
                            ride.getFreeSeats(),
                            ride.getDescription(),
                            ride.getDriverContact(),
                            ride.getDriverID(),
                            ride.getClicks(),
                            ride.getLocation(),
                            ride.getCreatedAt(),
                            ride.getPassengers()));
        }
        return ridesList;
    }

    public Ride findById(Integer id) throws Exception {
        if (id == null)
            return null;
        Ride ride = rides.findById(id).get();
        return new Ride(
                ride.getId(),
                ride.getOrigin(),
                ride.getDestination(),
                ride.getStartDate(),
                ride.getSeats(),
                ride.getFreeSeats(),
                ride.getDescription(),
                ride.getDriverContact(),
                ride.getDriverID(),
                ride.getClicks(),
                ride.getLocation(),
                ride.getCreatedAt(),
                ride.getPassengers());
    }

    public Ride save(Ride ride) throws Exception {
        if (ride == null
                || ride.getSeats() <= 0)
            return null;
        return rides.save(ride);
    }

    public Ride remove(Ride ride) throws Exception {
        if (ride == null)
            return null;
        rides.delete(ride);
        return ride;
    }

    /*
     * public void addClick(Long id) throws Exception {
     * Ride ride = rides.findById(id);
     * if (ride == null)
     * return;
     * ride.setClicks(ride.getClicks() + 1);
     * rides.save(ride);
     * }
     */

}
