package br.com.zapdados.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.zapdados.service.TxtService;
import br.com.zapdados.model.NuvemPalavras;
import br.com.zapdados.model.Txt;
import br.com.zapdados.service.IUsuarioService;
import br.com.zapdados.service.NuvemPalavraService;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/nuvem-palavras")
public class NuvemPalavrasController {
     
    @Autowired
    private NuvemPalavraService nuvemPalavrasService;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private TxtService txtService;

    @GetMapping("/obter-nuvem-palavras")
    public ResponseEntity<List<NuvemPalavras>> obterNuvemPalavras() {
        
        byte[] arquivo = usuarioService.obterArquivo("admin");

        List<String> rawlines = new BufferedReader(new InputStreamReader(
                new ByteArrayInputStream(arquivo), StandardCharsets.UTF_8))
                .lines()
                .collect(Collectors.toList());

        List<Txt> mensagens = txtService.parseTxt(rawlines)
                .stream()
                .flatMap(TxtResponse -> TxtResponse.getMensagens().stream())
                .collect(Collectors.toList());

        if (mensagens.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<NuvemPalavras> registros = nuvemPalavrasService.calcularFrequenciasPalavras(mensagens);
        return ResponseEntity.ok(registros);
    }


}
