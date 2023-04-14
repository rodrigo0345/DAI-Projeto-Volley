package com.example.application.repository;

import com.example.application.model.News;
import com.example.application.model.Ride;
import com.example.application.model.User.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.persistence.Table;
import java.util.List;


@Table(name = "news")
public interface NewsRepository extends CrudRepository<News, Integer> {
   
    @Query("SELECT n FROM news n ORDER BY n.id DESC LIMIT ?1 OFFSET ?2")
public List<News> findLimitedNews(Integer pag, Integer index);


    @Query("SELECT n FROM news n ORDER BY n.clicks DESC LIMIT ?1 OFFSET ?2")
    public List<Ride> findPopularNews(Integer pag, Integer index);

    public List<News> findByAuthor(User author);
    public News findByTitle(String title);
    public List<News> findAllByOrderByDateDesc();
    public News findById(Long id);
}
