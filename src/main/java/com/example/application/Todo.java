package com.example.application;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

// this is a JPA Entity
@Entity
public class Todo {

    @Id
    @GeneratedValue
    private Integer id;

    private boolean done = false;

    // used to validate both in view and on the server
    @NotBlank
    private String task;

    public Todo() {

    }

    public Todo(String task) {
        this.task = task;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public boolean isDone() {
        return this.done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getTask() {
        return this.task;
    }

    public void setTask(String task) {
        this.task = task;
    }
}
