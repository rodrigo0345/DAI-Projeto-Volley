package com.example.application.model;

import java.time.LocalDateTime;

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
    public LocalDateTime createdAt;
    private int seats;
    private int freeSeats;
    private String description;
    private String driverContact;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User driver;
    private int clicks;

    public User getUser() {
        return driver;
    }

    public void setUser(User user) {
        this.driver = user;
    }

}
