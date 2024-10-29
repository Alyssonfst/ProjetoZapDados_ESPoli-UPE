package br.com.zapdados.controllers;

import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.model.QtdUso;
import br.com.zapdados.service.QtdUsoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/uso")
public class QtdUsoController {

    @Autowired
    private QtdUsoService QtdUsoService;

    // Armazenando as mensagens processadas do controlador POST
    private static List<TxtResponse> storedTxtResponses;

    public static List<TxtResponse> getStoredTxtResponses() {
        return storedTxtResponses;
    }

    // Método para receber o TxtResponse do controlador POST
    public static void storeTxtResponses(List<TxtResponse> txtResponses) {
        storedTxtResponses = txtResponses;
    }

    @GetMapping("/quantidade-mensagens")
    public ResponseEntity<List<QtdUso>> getUserWordUsage() {
        if (storedTxtResponses == null) {
            return ResponseEntity.noContent().build();
        }

        List<QtdUso> usage = QtdUsoService.calcularQtdMensagens(storedTxtResponses);
        return ResponseEntity.ok(usage);
    }
}
