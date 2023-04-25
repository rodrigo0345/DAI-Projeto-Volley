package com.example.application.controller.Forum;

import com.example.application.controller.Forum.Wrappers.PostType;
import com.example.application.model.News.News;
import com.example.application.model.User.LoginUser;
import com.example.application.repository.NewsRepository;
import com.example.application.service.NewsService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class NewsController {

    private final NewsRepository newsRepository;

    public NewsController(NewsRepository news) {
        this.newsRepository = news;
    }

    public @Nonnull Iterable<News> findAll() throws Exception {
        Iterable<News> newsAux = newsRepository.findAll();
        List<News> newsList = new ArrayList<>();
        for (News n : newsAux) {
            newsList.add(
                    new News(
                            n.getId(),
                            n.getTitle(),
                            n.getContent(),
                            n.getAuthorID(),
                            n.getCreatedAt(),
                            n.getClicks(),
                            n.getLikes(),
                            n.getLikesID(),
                            n.getImage()));
        }
        return newsList;
    }

    public News findByTitle(String title) throws Exception {
        News newsAux = newsRepository.findByTitle(title);
        if (newsAux == null)
            return null;
        return new News(
                newsAux.getId(),
                newsAux.getTitle(),
                newsAux.getContent(),
                newsAux.getAuthorID(),
                newsAux.getCreatedAt(),
                newsAux.getClicks(),
                newsAux.getLikes(),
                newsAux.getLikesID(),
                newsAux.getImage());
    }

    /*
     * public Iterable<News> findByAuthor(User author) throws Exception {
     * Iterable<News> newsAux = newsRepository.findByAuthor(author);
     * List<News> newsList = new ArrayList<>();
     * for (News n : newsAux) {
     * newsList.add(
     * new News(
     * n.getId(),
     * n.getTitle(),
     * n.getContent(),
     * n.getAuthorID(),
     * n.getDate(),
     * n.getClicks()));
     * }
     * return newsList;
     * }
     * 
     * public Iterable<News> findLimitedNews(Integer pag, Integer index) throws
     * Exception {
     * Iterable<News> newsAux = newsRepository.findLimitedNews( pag, index);
     * List<News> newsList = new ArrayList<>();
     * for (News n : newsAux) {
     * newsList.add(
     * new News(
     * n.getId(),
     * n.getTitle(),
     * n.getContent(),
     * n.getAuthorID(),
     * n.getDate(),
     * n.getClicks()));
     * }
     * return newsList;
     * }
     */

    public News save(News news) throws Exception {
        if (news == null)
            return null;
        news.setCreatedAt(LocalDateTime.now());
        return newsRepository.save(news);
    }

    public News remove(News news) throws Exception {
        if (news == null)
            return null;
        newsRepository.delete(news);
        return news;
    }

    public Integer getLikes(Long id) throws Exception {
        News news = newsRepository.findById(id);
        if (news == null)
            return null;
        return news.getLikes();
    }

    public boolean addLike(PostType post, LoginUser user) {
        String type = post.getType();
        if (post == null || type == "ride") return false;
        News news = post.news;
        if(NewsService.verifyUserHasLiked(news, user)) return false;
        news.addLike(user.getId());
        newsRepository.save(news);
        return true;
    }

    public boolean removeLike(PostType post, LoginUser user) {
        String type = post.getType();
        if (post == null || type == "ride") return false;
        News news = post.news;
        if(!NewsService.verifyUserHasLiked(news, user)) return false;
        news.removeLike(user.getId());
        newsRepository.save(news);
        return true;
    }

    public boolean checkUserHasLiked(News news, LoginUser user) {
        if (News.hasLiked(news.getLikesID(), user)) return true;
        return false;
    }

}
