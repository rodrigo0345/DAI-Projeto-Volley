package com.example.application.service;

import com.nimbusds.jose.util.Resource;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {
  public static byte[] getImageAsBytes(MultipartFile image) throws IOException {
    return image.getBytes();
  }

  public static ByteArrayResource downloadImage(byte[] image) {
    return new ByteArrayResource(image);
  }
}
