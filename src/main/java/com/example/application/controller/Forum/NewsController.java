package com.example.application.controller.Forum;

import com.example.application.model.News;
import com.example.application.model.User.User;
import com.example.application.repository.NewsRepository;
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

    public NewsController(NewsRepository news) {this.newsRepository = news;}

    public @Nonnull Iterable<News> findAll() throws Exception {
        Iterable<News> newsAux = newsRepository.findAll();
        List<News> newsList = new ArrayList<>();
        for (News n : newsAux) {
            newsList.add(
                    new News(
                            n.getId(),
                            n.getTitle(),
                            n.getContent(),
                            n.getAuthor(),
                            n.getDate(),
                            n.getClicks()));
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
                newsAux.getAuthor(),
                newsAux.getDate(),
                newsAux.getClicks());
    }

    public Iterable<News> findByAuthor(User author) throws Exception {
        Iterable<News> newsAux = newsRepository.findByAuthor(author);
        List<News> newsList = new ArrayList<>();
        for (News n : newsAux) {
            newsList.add(
                    new News(
                            n.getId(),
                            n.getTitle(),
                            n.getContent(),
                            n.getAuthor(),
                            n.getDate(),
                            n.getClicks()));
        }
        return newsList;
    }

    public News save(News news) throws Exception {
        if (news == null)
            return null;
        news.setDate(LocalDateTime.now());
        return newsRepository.save(news);
    }

    public News remove(News news) throws Exception {
        if (news == null)
            return null;
        newsRepository.delete(news);
        return news;
    }

    public void addClick(Long id) throws Exception {
        News news = newsRepository.findById(id);
        if (news == null)
            return;
        news.setClicks(news.getClicks() + 1);
        newsRepository.save(news);
    }

}

