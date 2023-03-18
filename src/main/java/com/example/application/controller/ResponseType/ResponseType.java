package com.example.application.controller.ResponseType;

import org.springframework.http.ResponseEntity;

import java.util.ResourceBundle;

public class ResponseType<T> {

    public String error = null;
    public T success = null;

    public ResponseType() {
    }

    public void error(String error) {
        this.error = error;
    }

    public void success(T success) {
        this.success = success;
    }
}
