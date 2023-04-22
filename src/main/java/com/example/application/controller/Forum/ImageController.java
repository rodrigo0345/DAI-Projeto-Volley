package com.example.application.controller.Forum;

import com.example.application.controller.Wrapper.ResponseType;
import com.example.application.model.Image;
import com.example.application.repository.ImageRepository;

import com.example.application.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class ImageController {
    private final ImageService imageService;
    @Autowired
    public ImageController(ImageService imageService) { this.imageService = imageService; }
    @PostMapping("/images")
    public ResponseEntity<ResponseType<Image>> createImage(@RequestParam("image") MultipartFile imageFile) {
        try {
            byte[] imageData = imageFile.getBytes();

            if (imageData.length > 16777215) { // 16mb = 16777215 bytes | se as imagens forem guardadas em medium blob, esta é a limitação
                var response = new ResponseType<Image>();
                response.error("A imagem excede o tamanho máximo permitido (16MB)");
                return ResponseEntity.badRequest().body(response);
            }

            Image savedImage = imageService.saveImage(imageData);

            var response = new ResponseType<Image>();
            response.success(savedImage);
            return ResponseEntity.ok().body(response);

        } catch (IOException e) {
            var response = new ResponseType<Image>();
            response.error("Erro ao ler a imagem: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            var response = new ResponseType<Image>();
            response.error("Erro ao salvar a imagem: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
