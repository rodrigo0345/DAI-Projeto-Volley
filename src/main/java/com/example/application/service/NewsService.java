package com.example.application.service;

import com.example.application.model.News.News;
import com.example.application.model.User.LoginUser;

public class NewsService {
    
    public static boolean verifyUserHasLiked(News news, LoginUser user) {
        if (News.hasLiked(news.getLikesID(), user))
            return true;
        return false;
    }

}
