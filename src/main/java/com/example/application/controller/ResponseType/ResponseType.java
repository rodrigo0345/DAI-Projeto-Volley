package com.example.application.controller.ResponseType;

import java.util.ResourceBundle;
import org.springframework.http.ResponseEntity;

public class ResponseType<T> {

  public String error = null;
  public T success = null;

  public ResponseType() {}

  public void error(String error) { this.error = error; }

  public void success(T success) { this.success = success; }
}
