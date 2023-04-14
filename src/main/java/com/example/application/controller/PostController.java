package com.example.application.controller;

import com.example.application.model.Post;
import dev.hilla.Endpoint;

import java.time.LocalDate;

@Endpoint
public class PostController {

   public void creatPost(String type, String slug, String content, Integer authorId) {
      Post post = new Post();

      if (type.equals("Ride")) {

      } else if (type.equals("News")) {

      }

   }
}