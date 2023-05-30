package com.example.application.model;

import com.example.application.controller.Reports.ReportType;
import com.example.application.model.User.LoginUser;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ata")
public class Ata {
  @Id @GeneratedValue private Long id;
  private String title;
  private Long teamId;
  @Lob private String summary;
  private Long practiceId;
  private String createdAt;
}
