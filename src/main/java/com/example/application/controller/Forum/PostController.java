package com.example.application.controller.Forum;

import com.example.application.model.User.LoginUser;

import com.example.application.repository.NewsRepository;
import com.example.application.repository.RideRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.CalendarService;

import com.mysql.cj.log.Log;

import com.example.application.service.ImageService;
import com.example.application.service.NewsService;
import com.example.application.service.RideService;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import com.example.application.controller.Forum.AuxThread.AuxThread;
import com.example.application.controller.Forum.Wrappers.PostSavedType;
import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Ride;
import com.example.application.model.News.News;
import com.example.application.model.User.User;

import dev.hilla.Endpoint;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import java.util.function.Consumer;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class PostController {

    private final RideRepository ridesRepository;
    private final NewsRepository newsRepository;
    private final UserRepository usersRepository;

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
        List<News> newsAux = null;

        AuxThread newsThread = new AuxThread();
        newsThread.run(newsRepository, index, pageSize, "clicks", false);
        List<Ride> ridesAux = ridesRepository.findAll(PageRequest.of(index, pageSize, Sort.by("clicks").descending()));

        try {
            newsThread.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        newsAux = newsThread.getResult();

        Comparator<? super PostType> cmp = (PostType p1, PostType p2) -> {
            var p1Type = p1.getType();
            var p2Type = p2.getType();

            Integer p1Value = p1Type.equals(PostSavedType.NEWS) ? p1.news.getClicks() : p1.ride.getClicks();
            Integer p2Value = p2Type.equals(PostSavedType.NEWS) ? p2.news.getClicks() : p2.ride.getClicks();

            return p2Value.compareTo(p1Value);
        };
        return mixPosts(newsAux, ridesAux, cmp);
    }

    public Iterable<PostType> postsByNewest(int pageSize, int index) {
        List<News> newsAux = null;

        AuxThread newsThread = new AuxThread();
        newsThread.run(newsRepository, index, pageSize, "createdAt", false);
        List<Ride> ridesAux = ridesRepository
                .findAll(PageRequest.of(index, pageSize, Sort.by("createdAt").descending()));

        try {
            newsThread.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        newsAux = newsThread.getResult();

        Comparator<? super PostType> cmp = (PostType p1, PostType p2) -> {
            var p1Type = p1.getType();
            var p2Type = p2.getType();

            LocalDateTime p1Value = p1Type.equals(PostSavedType.NEWS) ? p1.news.getCreatedAt() : p1.ride.getCreatedAt();
            LocalDateTime p2Value = p2Type.equals(PostSavedType.NEWS) ? p2.news.getCreatedAt() : p2.ride.getCreatedAt();

            return p2Value.compareTo(p1Value);
        };

        return mixPosts(newsAux, ridesAux, cmp);
    }

    public Iterable<PostType> postsByOlder(int pageSize, int index) {
        List<News> newsAux = null;

        AuxThread newsThread = new AuxThread();
        newsThread.run(newsRepository, index, pageSize, "createdAt", true);

        List<Ride> ridesAux = ridesRepository
                .findAll(PageRequest.of(index, pageSize, Sort.by("createdAt").ascending()));

        try {
            newsThread.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        newsAux = newsThread.getResult();

        Comparator<? super PostType> cmp = (PostType p1, PostType p2) -> {
            var p1Type = p1.getType();
            var p2Type = p2.getType();

            LocalDateTime p1Value = p1Type.equals(PostSavedType.NEWS) ? p1.news.getCreatedAt() : p1.ride.getCreatedAt();
            LocalDateTime p2Value = p2Type.equals(PostSavedType.NEWS) ? p2.news.getCreatedAt() : p2.ride.getCreatedAt();

            return p1Value.compareTo(p2Value);
        };

        return mixPosts(newsAux, ridesAux, cmp);
    }

    // getPost
    public PostType getPost(String postType, Long id) throws Exception {
        PostType post = new PostType();
        if (postType.toLowerCase().trim().equals("news")) {
            News news = newsRepository.findById(id);
            post.news = news;
        } else if (postType.toLowerCase().trim().equals("ride")) {
            Ride ride = ridesRepository.findById(id);
            post.ride = ride;
        } else {
            throw new Exception("Not Found");
        }
        return post;
    }

    public ResponseEntity<ResponseType<PostType>> createPost(PostType post)
            throws Exception {

        PostSavedType postType = post.getType();

        // PRIORITY
        if (postType.equals(PostSavedType.NEWS)) {
            if (post.news == null) {
                var response = new ResponseType<PostType>();
                response.error("O conteúdo não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }

            News news = post.news;
            news.setCreatedAt(LocalDateTime.now());

            if (post.news.getImage().length > 5000000) {
                var response = new ResponseType<PostType>();
                response.error("A imagem não pode ter mais de 5MB");
                return ResponseEntity.badRequest().body(response);
            }

            try {
                newsRepository.save(news);
            } catch (Exception e) {
                var response = new ResponseType<PostType>();
                response.error(e.getMessage());
                return ResponseEntity.badRequest().body(response);
            }

        } else if (postType.equals(PostSavedType.RIDE)) {
            if (post.ride == null) {
                var response = new ResponseType<PostType>();
                response.error("O conteúdo não pode estar vazio");
                return ResponseEntity.badRequest().body(response);
            }

            Ride ride = post.ride;
            ride.setCreatedAt(LocalDateTime.now());

            Long rideId = null;
            try {
                rideId = ridesRepository.save(ride).getId();
            } catch (Exception e) {
                var response = new ResponseType<PostType>();
                response.error(e.getMessage());
                return ResponseEntity.badRequest().body(response);
            }

            try {
                post.ride.setId(rideId);
            } catch (Exception e) {
                var response = new ResponseType<PostType>();
                response.error(e.getMessage());
                return ResponseEntity.badRequest().body(response);
            } // possivel causa de problemas pq o id é sempre 0

        } else {
            var response = new ResponseType<PostType>();
            response.error("O tipo do post está incorreto");
            return ResponseEntity.badRequest().body(response);
        }
        var response = new ResponseType<PostType>();
        response.success(post);
        return ResponseEntity.ok().body(response);
    }

    public ResponseEntity<ResponseType<PostType>> editPost(PostType post, LoginUser loginUser) {

        PostSavedType postType = post.getType();
        if (VerifyOwner(post, loginUser)) {
            if (postType.equals(PostSavedType.RIDE)) {
                Ride ride = post.ride;
                try {
                    ridesRepository.save(ride);
                } catch (Exception e) {
                    var response = new ResponseType<PostType>();
                    response.error(e.getMessage());
                    return ResponseEntity.badRequest().body(response);
                }
                var response = new ResponseType<PostType>();
                response.success(post);
                return ResponseEntity.ok().body(response);
            } else if (postType.equals(PostSavedType.NEWS)) {
                News news = post.news;
                try {
                    removePost(post, loginUser);
                    newsRepository.save(news);
                } catch (Exception e) {
                    var response = new ResponseType<PostType>();
                    response.error(e.getMessage());
                    return ResponseEntity.badRequest().body(response);
                }
                var response = new ResponseType<PostType>();
                response.success(post);
                return ResponseEntity.ok().body(response);
            }
        }

        var response = new ResponseType<PostType>();
        response.error("Não tem permissão para editar o post");
        return ResponseEntity.badRequest().body(response);

    }

    private boolean VerifyOwner(PostType post, LoginUser loginUser) {

        PostSavedType postType = post.getType();
        if (postType.equals(PostSavedType.RIDE)) {
            Ride ride = post.ride;
            if (!(ride.getDriverID().equals(loginUser.getId()))) {
                var response = new ResponseType<PostType>();
                response.error("Não é o dono do post");
                return false;
            } else {
                return true;
            }
        }

        if (postType.equals(PostSavedType.NEWS)) {
            News news = post.news;
            Long id = Long.valueOf(loginUser.getId());
            if (!(news.getAuthorID().equals(id))) {
                var response = new ResponseType<PostType>();
                response.error("Não é o dono do post");
                return false;
            } else {
                return true;
            }

        }
        return false;
    }

    public void removePost(PostType post, LoginUser loginUser) {
        PostSavedType postType = post.getType();
        if (VerifyOwner(post, loginUser)) {
            if (postType.equals(PostSavedType.RIDE)) {
                Ride ride = post.ride;
                ridesRepository.delete(ride);
            }
        }

    }

    public void addClick(PostType post) throws Exception {
        PostSavedType type = post.getType();
        News news;
        Ride ride;
        if (post == null)
            return;
        if (type.equals(PostSavedType.NEWS)) {
            news = post.news;
            news.setClicks(news.getClicks() + 1);
            newsRepository.save(news);
        } else {
            ride = post.ride;
            ride.setClicks(ride.getClicks() + 1);
            ridesRepository.save(ride);
        }
    }
}
