package br.com.zapdados.service;

import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.model.QtdUso;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QtdUsoService {

    // Método para contar o número de mensagens por usuário
    public List<QtdUso> calcularQtdMensagens(List<TxtResponse> responses) {
        Map<String, Integer> userMessageCountMap = new HashMap<>();

        // Percorre cada TxtResponse
        for (TxtResponse response : responses) {
            String usuario = response.getUsuario();
            int messageCount = response.getMensagens().size(); // Conta o número de mensagens

            // Adiciona ou atualiza a contagem para o usuário
            userMessageCountMap.put(usuario, userMessageCountMap.getOrDefault(usuario, 0) + messageCount);
        }

        // Converte o mapa em uma lista de QtdUso
        return userMessageCountMap.entrySet().stream()
                .map(entry -> new QtdUso(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }
}
