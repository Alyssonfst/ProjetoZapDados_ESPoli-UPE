package br.com.zapdados.controllers;

import br.com.services.model.QtdUso;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.services.model.TempoUsoDados;

@RestController
@RequestMapping("/api/tempo-uso")
public class TempoUsoController {
    
    @GetMapping("/obter-dados-relatorio")
    public ResponseEntity<List<TempoUsoDados>> obterDadosRelatorio() {
        

        // mock de exemplo de retorno

        List<TempoUsoDados> temposDeUso = new ArrayList<>();
        
        TempoUsoDados t1 = new TempoUsoDados();
        t1.setAno(2024);
        t1.setDia(10);
        t1.setDiaSemana("Quinta-Feira");
        t1.setHoraDoDia(17);
        t1.setMes(10);
        
        List<QtdUso> qtdsUso =  new ArrayList<>();
        QtdUso qtdUso1 = new QtdUso();
        qtdUso1.setQuantidadeMensagens(25);
        qtdUso1.setUsername("joao");
        qtdsUso.add(qtdUso1);
        
        QtdUso qtdUso2 = new QtdUso();
        
        qtdUso2.setQuantidadeMensagens(50);
        qtdUso2.setUsername("maria");
        
        qtdsUso.add(qtdUso1);
        qtdsUso.add(qtdUso2);
        
        t1.setQtdUso(qtdsUso);

        //temposDeUso.add(new )
        
        temposDeUso.add(t1);

        return new ResponseEntity<>(temposDeUso, HttpStatus.OK);
    }
}
