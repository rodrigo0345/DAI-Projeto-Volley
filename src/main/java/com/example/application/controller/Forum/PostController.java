package com.example.application.controller.Forum;

import com.example.application.model.User.LoginUser;

import com.example.application.repository.CalendarRepository;
import com.example.application.repository.NewsRepository;
import com.example.application.repository.RideRepository;
import com.example.application.repository.UserRepository;
import com.example.application.service.CalendarService;

import com.mysql.cj.log.Log;

import com.example.application.service.ImageService;
import com.example.application.service.RideService;

import com.vaadin.flow.server.auth.AnonymousAllowed;
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

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@Endpoint
@AnonymousAllowed
@RequiredArgsConstructor
public class PostController {

    private final RideRepository ridesRepository;

    private final NewsRepository newsRepository;

    private final UserRepository usersRepository;

    private final CalendarRepository calendarRepository;

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

            return p2Value.compareTo(p1Value);
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

        String postType = post.getType();

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
                CalendarService.createEvent(calendarRepository, post);
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

    public void editPost(PostType post, LoginUser loginUser) {

        String postType = post.getType();
        if (VerifyOwner(post, loginUser)) {
            if (postType.toLowerCase().trim().equals("ride")) {
                Ride ride = post.ride;
                try {
                    ridesRepository.save(ride);
                } catch (Exception e) {
                    var response = new ResponseType<PostType>();
                    response.error(e.getMessage());
                    return;
                }
            } else if (postType.toLowerCase().trim().equals("news")) {
                News news = post.news;
                try {
                    removePost(post, loginUser);
                    newsRepository.save(news);
                } catch (Exception e) {
                    var response = new ResponseType<PostType>();
                    response.error(e.getMessage());
                    return;
                }
            }
        }

        return;

    }

    private boolean VerifyOwner(PostType post, LoginUser loginUser) {

        String postType = post.getType();
        if (postType.toLowerCase().trim().equals("ride")) {
            Ride ride = post.ride;
            Long id = Long.valueOf(loginUser.getId());
            if (!(ride.getDriverID().equals(id))) {
                var response = new ResponseType<PostType>();
                response.error("Não é o dono do post");
                return false;
            } else {
                return true;
            }
        }

        if (postType.toLowerCase().trim().equals("news")) {
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
        String postType = post.getType();
        if (VerifyOwner(post, loginUser)) {
            if (postType.toLowerCase().trim().equals("ride")) {
                Ride ride = post.ride;
                ridesRepository.delete(ride);
            }
        }

    }

    public void addClick(PostType post) throws Exception {
        String type = post.getType();
        News news;
        Ride ride;
        if (post == null)
            return;
        if (type == "news") {
            news = post.news;
            news.setClicks(news.getClicks() + 1);
            newsRepository.save(news);
        } else {
            ride = post.ride;
            ride.setClicks(ride.getClicks() + 1);
            ridesRepository.save(ride);
        }
    }

    public boolean addPassenger(PostType post, LoginUser user) {
        String type = post.getType();
        if (post == null || type == "news") return false;
        Ride ride = post.ride;
        if (RideService.verifyPassengerInRide(ride, user) || RideService.verifyRideIsFull(ride)) return false;
        ride.addPassenger(user.getId());
        ridesRepository.save(ride);
        return true;
    }

    public boolean removePassenger(PostType post, LoginUser user) {
        String type = post.getType();
        if (post == null || type == "news") return false;
        Ride ride = post.ride;
        if (!RideService.verifyPassengerInRide(ride, user)) return false;
        ride.removePassenger(user.getId());
        ridesRepository.save(ride);
        return false;
    }

    public boolean checkPassengerInRide(Ride ride, LoginUser user) {
        if (Ride.containsPassenger(ride.getPassengers(), user)) return true;
        return false;
    }

}
