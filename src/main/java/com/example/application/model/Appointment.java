package com.example.application.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "appointments")
public class Appointment {
    
    @Id
    @GeneratedValue
    private Integer id;
    private Integer doctor;
    private Integer patient;
    private LocalDateTime date;
    private float weight;
    private float height;
    private float wingspan;
    private float attackJump;
    private float blockJump;
    private float muscleMassPerc;
    private float fatMassPerc;
    private float agility;
    private float attack;
    private float block;
    private float service;
    private float defense;
    private float reception;
    private float pass;
    private String selfConfidence;
    private String positiveThoughts;
    private String attention;
    private String competitiveAttitude;
    private String motivation;
    private String cognitiveOrientation;
}
