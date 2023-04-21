package com.example.application.controller.Wrapper;


// Just a wrapper to make the response more readable
// on the front-end
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
