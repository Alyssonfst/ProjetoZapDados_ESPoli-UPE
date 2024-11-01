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

                QtdUso qtdUso = tempoUso.getQtdUso()
                        .stream()
                        .filter(uso -> uso.getUsername().equals(usuario))
                        .findFirst()
                        .orElseGet(() -> {
                            QtdUso novoUso = new QtdUso(usuario, 0);
                            tempoUso.getQtdUso().add(novoUso);
                            return novoUso;
                        });

                        
                // Adiciona ou atualiza a contagem de mensagens
                qtdUso.setQuantidadeMensagens(qtdUso.getQuantidadeMensagens() + 1);;
                

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
