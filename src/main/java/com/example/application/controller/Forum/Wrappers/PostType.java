package com.example.application.controller.Forum.Wrappers;

import java.util.concurrent.Callable;

import org.atmosphere.config.service.Post;

import com.example.application.model.News;
import com.example.application.model.Ride;

public class PostType implements Comparable<PostType> {

    public News news;
    public Ride ride;

    public PostType() {
    }

    @Override
    public int compareTo(PostType arg0) {
        String typeArg0 = null;
        String typeThis = null;

        if (arg0.news != null) {
            typeArg0 = "news";
        } else if (arg0.ride != null) {
            typeArg0 = "ride";
        }

        if (this.news != null) {
            typeThis = "news";
        } else if (this.ride != null) {
            typeThis = "ride";
        }

        Integer countArg0 = typeArg0.equals("news") ? arg0.news.getClicks() : arg0.ride.getClicks();
        Integer countThis = typeThis.equals("news") ? this.news.getClicks() : this.ride.getClicks();

        return countArg0.compareTo(countThis);
    }

}
