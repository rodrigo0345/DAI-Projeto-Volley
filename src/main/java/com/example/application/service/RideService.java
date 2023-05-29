package com.example.application.service;

import com.example.application.model.Ride;
import com.example.application.model.User.LoginUser;
import com.example.application.model.User.User;

public class RideService {

    public static boolean verifyPassengerInRide(Ride ride, LoginUser passenger) {
        if (Ride.containsPassenger(ride.getPassengers(), passenger))
            return true;
        if (ride.getDriverID().equals(passenger.getId()))
            return false;

        return false;
    }

    public static boolean verifyRideIsFull(Ride ride) {
        if (ride.getPassengers().size() == ride.getSeats())
            return true;
        return false;
    }

    public static boolean verifyIfUserIsDriver(Ride ride, LoginUser user) {
        if (ride.getDriverID().equals(user.getId()))
            return true;
        return false;
    }

}
