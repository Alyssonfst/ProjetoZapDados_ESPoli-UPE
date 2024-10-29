package br.com.zapdados.controllers;

import br.com.zapdados.model.TempoUso;
import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.service.TempoUsoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tempo")
public class TempoUsoController {

    @Autowired
    private TempoUsoService tempoUsoService;

    // Endpoint para obter o uso de tempo por usuário
    @GetMapping("/obter-tempo-uso")
    public ResponseEntity<List<TempoUso>> getUserTimeUsage() {
        // Obter as respostas armazenadas do controlador QtdUsoController
        List<TxtResponse> txtResponses = QtdUsoController.getStoredTxtResponses();

        if (txtResponses == null || txtResponses.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }

        // Calcula o uso de tempo
        List<TempoUso> tempoUsos = tempoUsoService.calculateUserTimeUsage(txtResponses);
        return ResponseEntity.ok(tempoUsos);
    }
}
