package br.com.zapdados.controllers;

import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.service.TxtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/upload")
public class UploadTxtController {

        @Autowired
        private TxtService txtService;

        @PostMapping("/txt-file")
        public ResponseEntity<List<TxtResponse>> uploadFile(@RequestParam("file")MultipartFile file){
           try {
               List<String> rawlines = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))
                       .lines()
                       .collect(Collectors.toList());

               List<TxtResponse> response = txtService.parseTxt(rawlines);

                QtdUsoController.storeTxtResponses(response);

               return ResponseEntity.ok(response);
           } catch (Exception e){
               e.printStackTrace();
               return ResponseEntity.status(500).build();
           }

    }
}
