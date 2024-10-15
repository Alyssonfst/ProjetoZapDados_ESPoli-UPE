package br.com.zapdados.controllers;

import br.com.services.RelatorioExpressoesService;
import br.com.services.model.RelatorioExpressoes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/expressoes")
public class RelatorioExpressoesController {

    @Autowired
    private RelatorioExpressoesService relatorioExpressoesService;

    @GetMapping("/relatorio")
    public ResponseEntity<List<RelatorioExpressoes>> obterRelatorioExpressoes() {
        // Mock de mensagens por usuário
        Map<String, List<String>> mensagensPorUsuario = new HashMap<>();
        mensagensPorUsuario.put("joao", Arrays.asList("Oi, como vai?", "Tudo bem?"));
        mensagensPorUsuario.put("maria", Arrays.asList("Olá, bom dia!", "Sim, tudo certo."));

        List<RelatorioExpressoes> relatorio = new ArrayList<>();

        for (Map.Entry<String, List<String>> entry : mensagensPorUsuario.entrySet()) {
            String username = entry.getKey();
            List<String> mensagens = entry.getValue();

            // Processar as mensagens de cada usuário
            Map<String, Integer> expressoes = relatorioExpressoesService.processarExpressoes(mensagens);

            // Criar e adicionar o relatório para o usuário
            RelatorioExpressoes relatorioExpressoes = new RelatorioExpressoes(username, expressoes);
            relatorio.add(relatorioExpressoes);
        }

        // Retorna o relatório com status HTTP 200 (OK)
        return new ResponseEntity<>(relatorio, HttpStatus.OK);
    }
}
