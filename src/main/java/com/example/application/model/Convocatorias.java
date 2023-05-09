package com.example.application.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
@Table(name = "convocatorias")
public class Convocatorias {
    @Id
    @GeneratedValue
    public Long id;

    private String title;
    private String description;

    private LocalDateTime date;

    @ManyToOne
    private User managerID;

    @OneToMany(mappedBy = "id")
    private List<User> players;
}