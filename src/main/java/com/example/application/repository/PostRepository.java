package com.example.application.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.application.model.Post;

public interface PostRepository extends CrudRepository<Post, Long> {

}
