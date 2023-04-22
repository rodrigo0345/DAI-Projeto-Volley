package com.example.application.service;

import com.example.application.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.application.model.Image;

@Service
public class ImageService {
    private final ImageRepository imageRepository;
    @Autowired
    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }
    public Image saveImage(byte[] imageData) {
        Image image = new Image();
        image.setData(imageData);
        return imageRepository.save(image);
    }
}
