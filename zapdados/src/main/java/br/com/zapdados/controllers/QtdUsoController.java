package br.com.zapdados.controllers;

import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.model.QtdUso;
import br.com.zapdados.service.IUsuarioService;
import br.com.zapdados.service.QtdUsoService;
import br.com.zapdados.service.TxtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/uso")
public class QtdUsoController {

    @Autowired
    private QtdUsoService QtdUsoService;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private TxtService txtService;

    
    @GetMapping("/quantidade-mensagens")
    public ResponseEntity<List<QtdUso>> getUserWordUsage() {
        
        byte[] arquivo = usuarioService.obterArquivo("admin");
        
        List<String> rawlines = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(arquivo), StandardCharsets.UTF_8))
                       .lines()
                       .collect(Collectors.toList());
        
        List<TxtResponse> txtResponses = txtService.parseTxt(rawlines);

        if (txtResponses == null || txtResponses.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }

        List<QtdUso> usage = QtdUsoService.calcularQtdMensagens(txtResponses);
        return ResponseEntity.ok(usage);
    }
}
