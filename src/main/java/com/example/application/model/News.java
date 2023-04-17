package com.example.application.model;


//import com.mysql.cj.jdbc.Blob;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue
    private Long id;
    private String title;

    @Lob
    @Column(name = "content", length = 512)
    private String content;
    // private Blob image; Later
    // @ManyToOne
    // @JoinColumn(name = "user_id", nullable = false)
    private Long authorID;
    public LocalDateTime createdAt;
    private int clicks;
}
