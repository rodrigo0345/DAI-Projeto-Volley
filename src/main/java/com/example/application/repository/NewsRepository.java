package com.example.application.repository;

import com.example.application.model.News;
import com.example.application.model.User.User;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.persistence.Table;

import java.util.List;
import java.util.Optional;

@Table(name = "news")
public interface NewsRepository extends CrudRepository<News, Integer> {

    // @Query("SELECT n FROM news n ORDER BY n.clicks DESC LIMIT ?1 OFFSET ?2")
    // public List<Ride> findPopularNews(Integer pag, Integer index);

    public List<News> findAll(Pageable rq);

    public List<News> findByAuthorID(User author);

    public News findByTitle(String title);

    public News findById(Long id);
}
