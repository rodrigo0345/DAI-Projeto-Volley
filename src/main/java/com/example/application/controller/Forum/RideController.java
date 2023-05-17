package com.example.application.controller.Forum;

import com.example.application.controller.Forum.Wrappers.PostSavedType;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Ride;
import com.example.application.model.User.LoginUser;
import com.example.application.repository.RideRepository;
import com.example.application.service.RideService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

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

    public ResponseEntity<ResponseType<Ride>> findById(Integer id) throws Exception {
        var response = new ResponseType<Ride>();

        if (id == null) {
            response.error("Id inválido");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            Ride ride = rides.findById(id).get();
            response.success(ride);
        } catch (Exception e) {
            response.error("A boleia que pretende não existe");
            return ResponseEntity.badRequest().body(response);
        }

        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Ride>> save(Ride ride) throws Exception {
        var response = new ResponseType<Ride>();

        if (ride == null || ride.getSeats() <= 0) {
            response.error("Boleia inválida ou com lugares negativos");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            rides.save(ride);
        } catch (Exception e) {
            response.error("A boleia que pretende criar já existe");
            return ResponseEntity.badRequest().body(response);
        }

        response.success(ride);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<Ride>> remove(Ride ride) throws Exception {
        var response = new ResponseType<Ride>();

        if (ride == null) {
            response.error("Boleia inválida");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            rides.delete(ride);
        } catch (Exception e) {
            response.error("A boleia que pretende apagar não existe");
            return ResponseEntity.badRequest().body(response);
        }

        response.success(ride);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<Boolean> addPassenger(PostType post, LoginUser user) {
        PostSavedType type = post.getType();
         if (post == null || type.equals(PostSavedType.NEWS))
            return ResponseEntity.badRequest().body(false);
        Ride ride = post.ride;
        if (RideService.verifyPassengerInRide(ride, user) || RideService.verifyRideIsFull(ride)
                || RideService.verifyIfUserIsDriver(ride, user))
            return ResponseEntity.badRequest().body(false);
        ride.addPassenger(user.getId());
        rides.save(ride);
        return ResponseEntity.badRequest().body(true);
    }

    public ResponseEntity<Boolean> removePassenger(PostType post, LoginUser user) {
        PostSavedType type = post.getType();
        if (post == null || type.equals(PostSavedType.NEWS))
            return ResponseEntity.badRequest().body(false);
        Ride ride = post.ride;
        if (!RideService.verifyPassengerInRide(ride, user))
            return ResponseEntity.badRequest().body(false);
        ride.removePassenger(user.getId());
        rides.save(ride);
        return ResponseEntity.badRequest().body(true);
    }

    public ResponseEntity<Boolean> checkPassengerInRide(Ride ride, LoginUser user) {
        if (ride == null || user == null) {
            return ResponseEntity.badRequest().body(false);
        }

        if (Ride.containsPassenger(ride.getPassengers(), user))
            return ResponseEntity.ok().body(true);

        return ResponseEntity.badRequest().body(false);
    }

}
