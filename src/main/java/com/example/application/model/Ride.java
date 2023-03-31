package com.example.application.model;

import com.example.application.model.User.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "rides")
public class Ride {
    @Id @GeneratedValue public Long id;
    private String origin;
    private String destination;
    private LocalDate date;
    private LocalTime time;
    private int seats;
    private String description;
    private String driverContact;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User driver;
    public User getUser() {
        return driver;
    }

    public void setUser(User user) {
        this.driver = user;
    }


}
