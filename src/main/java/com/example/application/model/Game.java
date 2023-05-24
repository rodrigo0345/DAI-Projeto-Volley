package com.example.application.model;

import com.example.application.model.User.User;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.ElementCollection;
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
@Table(name = "games")
public class Game {

  @Id @GeneratedValue private Integer id;
  private LocalDateTime date;
  private String team;
  @ElementCollection private List<Integer> gameCall;
  private String opponent;
  private String local;
}
