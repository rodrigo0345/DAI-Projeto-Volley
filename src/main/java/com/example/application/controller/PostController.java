package com.example.application.controller;

import com.example.application.repository.PostRepository;
import com.example.application.model.Post;

import dev.hilla.Endpoint;

@Endpoint
public class PostController {

    private final PostRepository posts;

    public PostController(PostRepository posts) {
        this.posts = posts;
    }

    public Iterable<Post> findAll() {
        return posts.findAll();
    }

    public Post findById(Long id) {
        return posts.findById(id).orElse(null);
    }

}