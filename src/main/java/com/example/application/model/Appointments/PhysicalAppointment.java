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
@Table(name = "physical_appointments")
public class PhysicalAppointment {
    
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
}
