package com.example.application.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.application.model.User.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rides")
public class Ride {
    @Id
    @GeneratedValue
    public Long id;
    private String origin;
    private String destination;
    public LocalDateTime startDate;
    private int seats;
    private int freeSeats;
    private String description;
    private String driverContact;
    private Integer driverID;
    private int clicks;
    private String location;
    private LocalDateTime createdAt;

    @ElementCollection
    //@JoinColumn(name = "user_id", nullable = true)
    private List<Integer> passengers;

    public void addPassenger(Integer userID) {
        passengers.add(userID);
    }
    
    public void removePassenger(Integer userID) {
        passengers.remove(userID);
    }

    public static boolean containsPassenger(List<Integer> passengers, User user) {
        if (passengers.contains(user.getId()) == true) return true;
        return false;
    }

}

