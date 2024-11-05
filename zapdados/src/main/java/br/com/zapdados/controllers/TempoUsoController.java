package br.com.zapdados.controllers;

import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.model.UsuarioTempoUso;
import br.com.zapdados.service.IUsuarioService;
import br.com.zapdados.service.TempoUsoService;
import br.com.zapdados.service.TxtService;
import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tempo")
public class TempoUsoController {

    @Autowired
    private TempoUsoService tempoUsoService;
    
    @Autowired
    private IUsuarioService usuarioService;
    
    @Autowired
    private TxtService txtService;

    // Endpoint para obter o uso de tempo por usuário
    @GetMapping("/obter-tempo-uso")
    public ResponseEntity<List<UsuarioTempoUso>> getUserTimeUsage() {
    // Obter as respostas armazenadas do controlador QtdUsoController
    byte[] arquivo = usuarioService.obterArquivo("admin");

    List<String> rawlines = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(arquivo), StandardCharsets.UTF_8))
                   .lines()
                   .collect(Collectors.toList());

    List<TxtResponse> txtResponses = txtService.parseTxt(rawlines);

    if (txtResponses == null || txtResponses.isEmpty()) {
        return ResponseEntity.noContent().build(); 
    }

    // Calcula o uso de tempo
    List<UsuarioTempoUso> usuarioTemposUsos = tempoUsoService.calculateUserTimeUsage(txtResponses);
    return ResponseEntity.ok(usuarioTemposUsos);
    }
}
