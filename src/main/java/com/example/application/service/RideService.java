package com.example.application.service;

import com.example.application.model.Ride;
import com.example.application.model.User.User;

public class RideService {
    public static boolean verifyPassengerInRide(Ride ride, User passenger) {
        if(Ride.containsPassenger(ride.getPassengers(), passenger)) return true;
        return false;
    }
}
