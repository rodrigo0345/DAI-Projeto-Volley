package com.example.application.controller.Forum;

import com.example.application.controller.ResponseType.ResponseType;
import com.example.application.model.User.LoginUser;
import com.example.application.repository.NewsRepository;
import com.example.application.repository.RideRepository;
import com.example.application.repository.UserRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.model.News;
import com.example.application.model.Ride;

import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.hibernate.event.spi.PostCommitUpdateEventListener;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class PostController {

    private final RideRepository ridesRepository;

    private final NewsRepository newsRepository;

    public Iterable<PostType> popularPosts(Integer pageSize, Integer index) {
        List<News> newsAux = newsRepository.findLimitedNews(Sort.by("clicks"), pageSize, index);
        List<Ride> ridesAux = ridesRepository.findLimitedRides(Sort.by("clicks"), pageSize, index);
        List<PostType> posts = new ArrayList<>();
        PostType postType = new PostType();
        newsAux.forEach(el -> {
            postType.news = el;
            posts.add(postType);
        });
        ridesAux.forEach(el -> {
            postType.ride = el;
            posts.add(postType);
        });

        Collections.sort(posts);

        return posts;
    }

    public ResponseEntity<ResponseType<PostType>> postsByNewest(int pageSize, int index) {
        return null;
    }

    public ResponseEntity<ResponseType<PostType>> postsByOlder(int pageSize, int index) {
        return null;
    }

    public ResponseEntity<ResponseType<PostType>> createPost(String postType, PostType post) {
        // PRIORITY
        if (postType.toLowerCase().trim().equals("news")) {
            if (post.news == null) {
                var response = new ResponseType<PostType>();
                response.error("O conteúdo não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }

            News news = post.news;

            try {
                newsRepository.save(news);
            } catch (Exception e) {
                var response = new ResponseType<PostType>();
                response.error(e.getMessage());
                return ResponseEntity.badRequest().body(response);
            }

        } else if (postType.toLowerCase().trim().equals("ride")) {
            if (post.ride == null) {
                var response = new ResponseType<PostType>();
                response.error("O conteúdo não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }

            Ride ride = post.ride;

            try {
                ridesRepository.save(ride);
            } catch (Exception e) {
                var response = new ResponseType<PostType>();
                response.error(e.getMessage());
                return ResponseEntity.badRequest().body(response);
            }

        } else {
            var response = new ResponseType<PostType>();
            response.error("O tipo do post está incorreto");
            return ResponseEntity.badRequest().body(response);
        }
        var response = new ResponseType<PostType>();
        response.success(post);
        return ResponseEntity.ok().body(response);
    }

    public void editPost(String postType, PostType post) {
    }

}