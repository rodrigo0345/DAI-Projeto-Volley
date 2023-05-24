package com.example.application.model.Appointments;

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
@Table(name = "technical_appointments")
public class TechnicalAppointment {
    
    @Id
    @GeneratedValue
    private Integer id;
    private Integer doctor;
    private Integer patient;
    private LocalDateTime date;
    private float attack;
    private float block;
    private float service;
    private float defense;
    private float reception;
    private float pass;

}
