package com.example.application.model.Team;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
@Table(name = "team")
public class Team implements Serializable {
    @Id
    @GeneratedValue
    public Long id;
    private Escalao escalao;
    private String name;

    private Integer managerID;

    @ElementCollection
    private List<Integer> players;
}