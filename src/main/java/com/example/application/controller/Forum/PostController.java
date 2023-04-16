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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.hibernate.event.spi.PostCommitUpdateEventListener;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class PostController {

    private final RideRepository ridesRepository;

    private final NewsRepository newsRepository;

    public Iterable<PostType> popularPosts(Integer pageSize, Integer index) {
        List<News> newsAux = newsRepository.findAll(PageRequest.of(index, pageSize, Sort.by("clicks").descending()));
        List<Ride> ridesAux = ridesRepository.findAll(PageRequest.of(index, pageSize, Sort.by("clicks").descending()));
        List<PostType> posts = new ArrayList<>();

        for (News news : newsAux) {
            PostType postType = new PostType();
            postType.news = news;
            posts.add(postType);
        }
        for (Ride ride : ridesAux) {
            PostType postType = new PostType();
            postType.ride = ride;
            posts.add(postType);
        }

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
            news.setCreatedAt(LocalDateTime.now());

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
            ride.setCreatedAt(LocalDateTime.now());

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