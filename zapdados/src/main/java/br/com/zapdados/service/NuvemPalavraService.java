package br.com.zapdados.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import br.com.zapdados.config.PalavrasIgnoradas;
import br.com.zapdados.model.NuvemPalavras;
import br.com.zapdados.model.Txt;

@Service
public class NuvemPalavraService {
    
    public List<NuvemPalavras> calcularFrequenciasPalavras(List<Txt> mensagens) {
        Map<String, Integer> frequencias = new HashMap<>();

        for (Txt txt : mensagens) {
            if (txt.getMensagem() == null || txt.getMensagem().isEmpty()) {
                continue;
            }

            String[] palavras = txt.getMensagem()
                                    .toLowerCase()
                                    .replaceAll("[^a-zA-ZÀ-ÿ0-9\\s]", "")
                                    .split("\\s+");

            for (String palavra : palavras) {
                if (palavra.length() > 3 && !PalavrasIgnoradas.LISTA.contains(palavra)) {
                    frequencias.put(palavra, frequencias.getOrDefault(palavra, 0) + 1);
                }
            }
        }

        return frequencias.entrySet()
                .stream()
                .map(entry -> new NuvemPalavras(entry.getKey(), entry.getValue()))
                .sorted((a, b) -> Integer.compare(b.getFrequencia(), a.getFrequencia()))
                .toList();
    }

}

