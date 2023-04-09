package com.example.application.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import javax.persistence.Id;

import com.example.application.model.User.LoginUser;

@Entity
public class Post {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String slug;
    private String content;
    private Integer authorId;
    private LocalDateTime publishedOn;
    private LocalDateTime updatedOn;

    public Post() {
    }

    public Post(String title, String slug, String content, Integer authorId) {
        this.title = title;
        this.slug = slug;
        this.content = content;
        this.authorId = authorId;
        this.publishedOn = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getAuthor() {
        return authorId;
    }

    public void setAuthor(Integer authorId) {
        this.authorId = authorId;
    }

    public LocalDateTime getPublishedOn() {
        return publishedOn;
    }

    public void setPublishedOn(LocalDateTime publishedOn) {
        this.publishedOn = publishedOn;
    }

    public LocalDateTime getUpdatedOn() {
        return updatedOn;
    }

    public void setUpdatedOn(LocalDateTime updatedOn) {
        this.updatedOn = updatedOn;
    }

    @Override
    public String toString() {
        return "Post [author id=" + authorId + ", content=" + content + ", id=" + id + ", publishedOn=" + publishedOn
                + ", slug=" + slug + ", title=" + title + ", updatedOn=" + updatedOn + "]";
    }

}
