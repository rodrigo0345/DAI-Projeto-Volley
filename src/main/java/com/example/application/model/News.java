package com.example.application.model;

import com.example.application.model.User.User;
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
    private String content;
    //private Blob image; Later
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User author;
    private LocalDateTime date;
    private int clicks;

    public User getUser() {
        return author;
    }

    public void setUser(User user) {
        this.author = user;
    }
}
