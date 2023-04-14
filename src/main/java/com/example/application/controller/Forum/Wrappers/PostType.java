package com.example.application.controller.Forum.Wrappers;

import java.util.concurrent.Callable;

import org.atmosphere.config.service.Post;

import com.example.application.model.News;
import com.example.application.model.Ride;

public class PostType implements Comparable<PostType>{

    public News news;
    public Ride ride;

    public PostType() {
    }

    @Override
    public int compareTo(PostType arg0) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'compareTo'");
    }

}
