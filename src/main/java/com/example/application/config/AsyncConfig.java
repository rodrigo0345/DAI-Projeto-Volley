package com.example.application.config;

import java.util.concurrent.Executor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration     
@EnableAsync
    public class AsyncConfig {

        @Bean(name="taskExecutor")
        public Executor taskExecutor() {
            ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
             executor.setQueueCapacity(100);
            executor.setMaxPoolSize(4);
             executor.setCorePoolSize(2);
            executor.setThreadNamePrefix("poolThread-");
            executor.initialize();
            return executor;
        } 
    } 
