package com.example.application.controller.Forum;

import com.example.application.repository.NewsRepository;
import com.example.application.repository.RideRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.News;
import com.example.application.model.Ride;

import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class PostController {

    private final RideRepository ridesRepository;

    private final NewsRepository newsRepository;

    private List<PostType> mixPosts(List<News> news, List<Ride> rides, Comparator<? super PostType> cmp) {
        List<PostType> posts = new ArrayList<>();
        for (News n : news) {
            PostType postType = new PostType();
            postType.news = n;
            posts.add(postType);
        }
        for (Ride r : rides) {
            PostType postType = new PostType();
            postType.ride = r;
            posts.add(postType);
        }

        Collections.sort(posts, cmp);
        return posts;
    }

    public Iterable<PostType> popularPosts(Integer pageSize, Integer index) {
        List<News> newsAux = newsRepository.findAll(PageRequest.of(index, pageSize, Sort.by("clicks").descending()));
        List<Ride> ridesAux = ridesRepository.findAll(PageRequest.of(index, pageSize, Sort.by("clicks").descending()));

        Comparator<? super PostType> cmp = (PostType p1, PostType p2) -> {
            var p1Type = p1.getType();
            var p2Type = p2.getType();

            Integer p1Value = p1Type.equals("news") ? p1.news.getClicks() : p1.ride.getClicks();
            Integer p2Value = p2Type.equals("news") ? p2.news.getClicks() : p2.ride.getClicks();

            return p1Value.compareTo(p2Value);
        };
        return mixPosts(newsAux, ridesAux, cmp);
    }

    public Iterable<PostType> postsByNewest(int pageSize, int index) {
        List<News> newsAux = newsRepository.findAll(PageRequest.of(index, pageSize, Sort.by("createdAt").descending()));
        List<Ride> ridesAux = ridesRepository
                .findAll(PageRequest.of(index, pageSize, Sort.by("createdAt").descending()));

        Comparator<? super PostType> cmp = (PostType p1, PostType p2) -> {
            var p1Type = p1.getType();
            var p2Type = p2.getType();

            LocalDateTime p1Value = p1Type.equals("news") ? p1.news.getCreatedAt() : p1.ride.getCreatedAt();
            LocalDateTime p2Value = p2Type.equals("news") ? p2.news.getCreatedAt() : p2.ride.getCreatedAt();

            return p2Value.compareTo(p1Value);
        };

        return mixPosts(newsAux, ridesAux, cmp);
    }

    public Iterable<PostType> postsByOlder(int pageSize, int index) {
        List<News> newsAux = newsRepository.findAll(PageRequest.of(index, pageSize, Sort.by("createdAt").ascending()));
        List<Ride> ridesAux = ridesRepository
                .findAll(PageRequest.of(index, pageSize, Sort.by("createdAt").ascending()));

        Comparator<? super PostType> cmp = (PostType p1, PostType p2) -> {
            var p1Type = p1.getType();
            var p2Type = p2.getType();

            LocalDateTime p1Value = p1Type.equals("news") ? p1.news.getCreatedAt() : p1.ride.getCreatedAt();
            LocalDateTime p2Value = p2Type.equals("news") ? p2.news.getCreatedAt() : p2.ride.getCreatedAt();

            return p1Value.compareTo(p2Value);
        };

        return mixPosts(newsAux, ridesAux, cmp);
    }

    public ResponseEntity<ResponseType<PostType>> createPost(String postType, PostType post) throws Exception {
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

    private News getNews(Long id) {
        News news = newsRepository.findById(id);
        news.setClicks(news.getClicks() + 1);
        newsRepository.save(news);
        return news;
    }

    private Ride getRide(Long id) {
        Ride ride = ridesRepository.findById(id);
        ride.setClicks(ride.getClicks() + 1);
        ridesRepository.save(ride);
        return ride;
    }

    public PostType getPost(String postType, Long id) {
        // add +1 on the click because it means it was clicked
        PostType post = new PostType();
        if (postType.toLowerCase().trim().equals("news")) {
            post.news = getNews(id);
            return post;
        } else if (postType.toLowerCase().trim().equals("ride")) {
            post.ride = getRide(id);
            return post;
        }
        return null;
    }
}