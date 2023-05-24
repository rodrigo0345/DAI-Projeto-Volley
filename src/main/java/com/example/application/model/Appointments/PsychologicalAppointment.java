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
@Table(name = "psychological_appointments")
public class PsychologicalAppointment {

  @Id @GeneratedValue private Integer id;
  private Integer doctor;
  private Integer patient;
  private LocalDateTime date;
  private String selfConfidence;
  private String positiveThoughts;
  private String attention;
  private String competitiveAttitude;
  private String motivation;
  private String cognitiveOrientation;
}
