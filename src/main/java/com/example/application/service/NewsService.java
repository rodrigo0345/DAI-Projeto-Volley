package com.example.application.service;

import com.example.application.model.News.News;
import com.example.application.model.User.LoginUser;
import com.example.application.repository.NewsRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

public class NewsService {

    public static boolean verifyUserHasLiked(Long newsId, LoginUser user, NewsRepository newsRepository) {
        News post;
        try {
            post = newsRepository.findById(newsId);
        } catch (Exception e) {
            return false;
        }

        if (News.hasLiked(post.getLikesID(), user))
            return true;
        return false;
    }

}
