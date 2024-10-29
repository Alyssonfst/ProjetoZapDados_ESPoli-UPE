package br.com.zapdados.service;

import br.com.zapdados.model.QtdUso;
import br.com.zapdados.model.TempoUso;
import br.com.zapdados.model.TxtResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TempoUsoService {

    public List<TempoUso> calculateUserTimeUsage(List<TxtResponse> txtResponses) {
        Map<String, Map<String, TempoUso>> userTimeMap = new HashMap<>();

        for (TxtResponse response : txtResponses) {
            String usuario = response.getUsuario();
            for (var mensagem : response.getMensagens()) {
                LocalDateTime dateTime = mensagem.getDateTime();
                String diaSemana = dateTime.getDayOfWeek().name();
                int horaDoDia = dateTime.getHour();
                int dia = dateTime.getDayOfMonth();
                int mes = dateTime.getMonthValue();
                int ano = dateTime.getYear();

                String key = String.format("%d-%02d-%02d", ano, mes, dia);

                TempoUso tempoUso = userTimeMap
                        .computeIfAbsent(usuario, k -> new HashMap<>())
                        .computeIfAbsent(key, k -> new TempoUso(horaDoDia, diaSemana, dia, mes, ano, new ArrayList<>()));

                // Adiciona ou atualiza a contagem de mensagens
                boolean found = false;
                for (QtdUso uso : tempoUso.getQtdUso()) {
                    if (uso.getUsername().equals(usuario)) {
                        uso.setQuantidadeMensagens(uso.getQuantidadeMensagens() + 1); // Incrementa a contagem
                        found = true; // Marca que o usuário foi encontrado
                        break;
                    }
                }

                if (!found) {
                    tempoUso.getQtdUso().add(new QtdUso(usuario, 1)); // Adiciona um novo QtdUso
                }
            }
        }

        // Converte o mapa em uma lista
        List<TempoUso> tempoUsos = new ArrayList<>();
        for (Map<String, TempoUso> userMap : userTimeMap.values()) {
            tempoUsos.addAll(userMap.values());
        }

        return tempoUsos;
    }
}
