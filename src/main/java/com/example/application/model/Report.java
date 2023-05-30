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
@Table(name = "reports")
public class Report {
  @Id @GeneratedValue private Long id;
  @Enumerated(EnumType.STRING) private ReportType type;
  @Lob private byte[] image;
  private Long teamId;
  private String createdAt;
}
