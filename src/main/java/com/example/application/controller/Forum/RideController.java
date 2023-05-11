package com.example.application.controller.Forum;

import com.example.application.controller.Forum.Wrappers.PostType;
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

@Endpoint
@AnonymousAllowed
public class RideController {

  private final RideRepository rides;

  public RideController(RideRepository rides) { this.rides = rides; }

  public @Nonnull Iterable<Ride> findAll() throws Exception {
    Iterable<Ride> ridesAux = rides.findAll();
    List<Ride> ridesList = new ArrayList<>();
    for (Ride ride : ridesAux) {
      ridesList.add(
          new Ride(ride.getId(), ride.getOrigin(), ride.getDestination(),
                   ride.getStartDate(), ride.getSeats(), ride.getFreeSeats(),
                   ride.getDescription(), ride.getDriverContact(),
                   ride.getDriverID(), ride.getClicks(), ride.getLocation(),
                   ride.getCreatedAt(), ride.getPassengers()));
    }
    return ridesList;
  }

  public Ride findById(Integer id) throws Exception {
    if (id == null)
      return null;
    Ride ride = rides.findById(id).get();
    return new Ride(ride.getId(), ride.getOrigin(), ride.getDestination(),
                    ride.getStartDate(), ride.getSeats(), ride.getFreeSeats(),
                    ride.getDescription(), ride.getDriverContact(),
                    ride.getDriverID(), ride.getClicks(), ride.getLocation(),
                    ride.getCreatedAt(), ride.getPassengers());
  }

  public Ride save(Ride ride) throws Exception {
    if (ride == null || ride.getSeats() <= 0)
      return null;
    return rides.save(ride);
  }

  public Ride remove(Ride ride) throws Exception {
    if (ride == null)
      return null;
    rides.delete(ride);
    return ride;
  }

  public boolean addPassenger(PostType post, LoginUser user) {
    String type = post.getType();
    if (post == null || type.equals("news"))
      return false;
    Ride ride = post.ride;
    if (RideService.verifyPassengerInRide(ride, user) ||
        RideService.verifyRideIsFull(ride) ||
        RideService.verifyIfUserIsDriver(ride, user))
      return false;
    ride.addPassenger(user.getId());
    rides.save(ride);
    return true;
  }

  public boolean removePassenger(PostType post, LoginUser user) {
    String type = post.getType();
    if (post == null || type == "news")
      return false;
    Ride ride = post.ride;
    if (!RideService.verifyPassengerInRide(ride, user))
      return false;
    ride.removePassenger(user.getId());
    rides.save(ride);
    return true;
  }

  public boolean checkPassengerInRide(Ride ride, LoginUser user) {
    if (Ride.containsPassenger(ride.getPassengers(), user))
      return true;
    return false;
  }
}
