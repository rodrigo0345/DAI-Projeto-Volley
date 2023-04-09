package com.example.application.repository;

import com.example.application.model.News;
import com.example.application.model.User.User;
import org.springframework.data.repository.CrudRepository;

import javax.persistence.Table;
import java.util.List;

@Table(name = "news")
public interface NewsRepository extends CrudRepository<News, Integer> {
    public News findByAuthor(User author);
    public News findByTitle(String title);
    public List<News> findAllByOrderByDateDesc();
}
