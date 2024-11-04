package br.com.zapdados.controllers;

import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.service.IUsuarioService;
import br.com.zapdados.service.TxtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/upload")
public class UploadTxtController {

        @Autowired
        private TxtService txtService;
        
        @Autowired
        private IUsuarioService usuarioService;

        @PostMapping("/txt-file")
        public ResponseEntity<List<TxtResponse>> uploadFile(@RequestParam("file") MultipartFile file){ 
           try {
               
               byte[] arquivo = file.getBytes();
               
               usuarioService.salvarArquivo(arquivo);

               return ResponseEntity.ok().build();
           } catch (Exception e){
               e.printStackTrace();
               return ResponseEntity.status(500).build();
           }

    }
}
