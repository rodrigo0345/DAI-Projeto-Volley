package com.example.application.controller.Forum;

import com.example.application.repository.PostRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.model.News;
import com.example.application.model.Post;
import com.example.application.model.Ride;

import dev.hilla.Endpoint;

@Endpoint
@AnonymousAllowed
public class PostController {

    private final PostRepository posts;

    public PostController(PostRepository posts) {
        this.posts = posts;
    }

    public Iterable<Post> popularPosts(int pageSize, int index) {
        // PRIORITY
        return null;
    }

    public Post postsByMostRecent(int pageSize, int index) {
        return null;
    }

    public Post postsByMostOlder(int pageSize, int index) {
        return null;
    }

    public void createPost(String postType, PostType post) {
        // PRIORITY
        if (postType.toLowerCase().trim().equals("news")) {
            if (post.news == null) {
                // handle error
                return;
            }

            News news = post.news;

            // save the post on the respective table

        } else if (postType.toLowerCase().trim().equals("ride")) {
            if (post.ride == null) {
                // handle error
                return;
            }

            Ride ride = post.ride;

            // save the post on the respective table

        } else {
            // handle error
        }
    }

    public void editPost(String postType, PostType post) {
    }

}