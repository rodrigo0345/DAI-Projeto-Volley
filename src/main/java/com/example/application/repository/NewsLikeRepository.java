package com.example.application.repository;

import dev.hilla.mappedtypes.Pageable;

import java.util.List;

import javax.persistence.Table;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.News.NewsLike;

@Table(name = "news_likes")
public interface NewsLikeRepository extends CrudRepository<NewsLike, Integer> {

    public List<NewsLike> findAll();

    public NewsLike findById(Long id);

    // public List<NewsLike> findAllfromUser(Pageable rq);

    // public List<NewsLike> findAllfromNews(Pageable rq);

}
