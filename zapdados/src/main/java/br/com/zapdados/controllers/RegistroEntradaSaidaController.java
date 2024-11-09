package br.com.zapdados.controllers;

import br.com.zapdados.model.RegistroEntradaSaida;
import br.com.zapdados.model.Txt;
import br.com.zapdados.service.IUsuarioService;
import br.com.zapdados.service.RegistroEntradaSaidaService;
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
@RequestMapping("/api/registro")
public class RegistroEntradaSaidaController {
    
    @Autowired
    private IUsuarioService usuarioService;
    
    @Autowired
    private TxtService txtService;

    @Autowired
    private RegistroEntradaSaidaService registroEntradaSaidaService;

    // Endpoint para obter o uso de tempo por usuário
    @GetMapping("/obter-entradas-saidas")
    public ResponseEntity<List<RegistroEntradaSaida>> obterEntradasSaidas(){
    // Obter as respostas armazenadas do controlador QtdUsoController
    byte[] arquivo = usuarioService.obterArquivo("admin");

    List<String> rawlines = new BufferedReader(new InputStreamReader(new ByteArrayInputStream(arquivo), StandardCharsets.UTF_8))
                   .lines()
                   .collect(Collectors.toList());

    List<Txt> mensagens = txtService.parseTxt(rawlines)
                    .stream()
                    .flatMap(TxtResponse -> TxtResponse.getMensagens().stream())
                    .collect(Collectors.toList());

    if (mensagens.isEmpty()){
        return ResponseEntity.noContent().build();
    }

    // Calcula o uso de tempo
    List<RegistroEntradaSaida> registros = registroEntradaSaidaService.calcularEntradasESaidasMensalmente(mensagens);
    return ResponseEntity.ok(registros);
    }
}
