package com.example.application.controller.Appointment;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.User.User;
import com.example.application.repository.PhysicalAppointmentRepository;
import com.example.application.repository.UserRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import org.springframework.http.ResponseEntity;

public class AppointmentController {

  PhysicalAppointmentRepository appointmentRepository;

  UserRepository userRepository;

  public static class PatientData {
    public Float weight;
    public Float height;
    public Float wingspan;
    public Float attackJump;
    public Float blockJump;
    public Float muscleMassPerc;
    public Float fatMassPerc;
    /*
     * public float agility;
     * public float attack;
     * public float block;
     * public float service;
     * public float defense;
     * public float reception;
     * public float pass;
     */
    public String selfConfidence;
    public String positiveThoughts;
    public String attention;
    public String competitiveAttitude;
    public String motivation;
    public String cognitiveOrientation;

    public Boolean isNull(PatientData patientData) {

      if (this.weight == null || this.height == null || this.wingspan == null ||
          this.attackJump == null || this.blockJump == null ||
          this.muscleMassPerc == null || this.fatMassPerc == null ||
          this.selfConfidence == null || this.positiveThoughts == null ||
          this.attention == null || this.competitiveAttitude == null ||
          this.motivation == null || this.cognitiveOrientation == null) {
        return true;
      }

      return false;
    }
  }

  public ResponseEntity<ResponseType<AppointmentType>>
  createAppointment(Integer doctor, Integer patient, String date,
                    PatientData data) {

    User doutor = userRepository.findById(doctor).get();

    User paciente = userRepository.findById(patient).get();

    if (date == null || date.trim().isEmpty()) {
      var response = new ResponseType<AppointmentType>();
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
      var response = new ResponseType<AppointmentType>();
      response.error("Invalid date format");
      return ResponseEntity.badRequest().body(response);
    }

    // Appointment newAppointment = AppointmetService.createAppointment(doutor,
    // paciente, date, data);

    var response = new ResponseType<AppointmentType>();
    response.success(null);
    return ResponseEntity.ok().body(response);
  }

  // just to get the type
  // on the frontend
  public AppointmentType dontUseThis() { return null; }
}
