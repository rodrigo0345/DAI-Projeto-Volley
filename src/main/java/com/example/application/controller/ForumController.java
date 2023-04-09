package com.example.application.controller;

import java.util.Set;

import org.joda.time.LocalDateTime;

import com.example.application.controller.ResponseType.ResponseType;
import com.example.application.model.Post;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import lombok.NonNull;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import reactor.core.publisher.Sinks.Many;

@Endpoint
@AnonymousAllowed
public class ForumController {

    private Many<Post> chatSink;
    private Flux<Post> chatSource;

    ForumController() {
        chatSink = Sinks.many().multicast().onBackpressureBuffer();
        chatSource = chatSink.asFlux();
    }

    // just for testing Im going to use the posts db
    public @NonNull Flux<Post> join(Integer page, Integer size) {
        return chatSource;
    }

    public void send(@NonNull Post post) {
        post.setPublishedOn(java.time.LocalDateTime.now());
        chatSink.tryEmitNext(post);
    }
}
