package com.example.application.controller;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import java.util.logging.Logger;

@Endpoint
@AnonymousAllowed
public class UploadEndpoint {

  public void upload(@Nonnull String filename, byte @Nonnull[] data) {
    System.out.printf("Uploaded `{}`: {} bytes", filename, data.length);
  }
}
