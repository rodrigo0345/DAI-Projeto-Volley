package com.example.application.controller.Appointment;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.User.User;
import com.example.application.repository.AppointmentRepository;
import com.example.application.repository.UserRepository;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Appointment {

    AppointmentRepository appointmentRepository;

    UserRepository userRepository;

    public class PatientData{
        public float weight;
        public float height;
        public float wingspan;
        public float attackJump;
        public float blockJump;
        public float muscleMassPerc;
        public float fatMassPerc;
        public float agility;
        public float attack;
        public float block;
        public float service;
        public float defense;
        public float reception;
        public float pass;
        public String selfConfidence;
        public String positiveThoughts;
        public String attention;
        public String competitiveAttitude;
        public String motivation;
        public String cognitiveOrientation;

        public Boolean isNull(PatientData patientData){



            return false;
        }

    }

    public ResponseEntity<ResponseType<Appointment>> createAppointment(Integer doctor , Integer patient
                                                                      , String date){


        User doutor = userRepository.findById(doctor).get();

        User paciente = userRepository.findById(patient).get();

        if(date == null || date.trim().isEmpty()){
            var response = new ResponseType<Appointment>();
            response.error("Falta a data");
            return ResponseEntity.badRequest().body(response);
        }

        String day = date.split("T")[0];
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime startDateTime;
        LocalDateTime endDateTime;
        try {
            startDateTime = LocalDateTime.parse(date, formatter);

        } catch (DateTimeParseException e) {
            var response = new ResponseType<Appointment>();
            response.error("Invalid date format");
            return ResponseEntity.badRequest().body(response);
        }




        Appointment newAppointment = AppointmetService.createAppointment(doutor, paciente, date, weight, height, wingspan
                                                                        attackJump, blockJump, muscleMassPerc, fatMassPerc,
                                                                        attack, block, service, defense, reception, pass,
                                                                        selfConfidence , positiveThoughts, attention,
                                                                        competitiveAttitude, motivation, cognitiveOrientation);


        var response = new ResponseType<Appointment>();
        response.success(newAppointment);
        return ResponseEntity.ok().body(response);
    }




}
