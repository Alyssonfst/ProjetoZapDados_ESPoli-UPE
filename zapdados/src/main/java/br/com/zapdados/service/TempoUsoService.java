package br.com.zapdados.service;

import br.com.zapdados.model.TempoUso;
import br.com.zapdados.model.TxtResponse;
import br.com.zapdados.model.UsuarioTempoUso;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class TempoUsoService {

    public List<UsuarioTempoUso> calculateUserTimeUsage(List<TxtResponse> txtResponses) {
        Map<String, UsuarioTempoUso> userTimeMap = new HashMap<>();

        for (TxtResponse response : txtResponses) {
            String usuario = response.getUsuario();
            for (var mensagem : response.getMensagens()) {
                LocalDateTime dateTime = mensagem.getDateTime();
                String diaSemana = dateTime.getDayOfWeek().name();
                int horaDoDia = dateTime.getHour();
                int dia = dateTime.getDayOfMonth();
                int mes = dateTime.getMonthValue();
                int ano = dateTime.getYear();

                // Criação de um objeto TempoUso temporário
                TempoUso tempoUsoTemp = new TempoUso(horaDoDia, diaSemana, dia, mes, ano);

                // Usa computeIfAbsent para criar ou obter o usuário
                UsuarioTempoUso usuarioTempoUso = userTimeMap.computeIfAbsent(usuario, k ->
                    UsuarioTempoUso.builder()
                                   .username(k)
                                   .temposUso(new ArrayList<>()) // Inicializa a lista
                                   .build()
                );

                // Verifica se já existe um TempoUso para o mesmo dia e hora
                Optional<TempoUso> tempoUsoExistente = usuarioTempoUso.getTemposUso()
                        .stream()
                        .filter(tempoUso -> tempoUso.getHoraDoDia() == horaDoDia &&
                                            tempoUso.getDia() == dia &&
                                            tempoUso.getMes() == mes &&
                                            tempoUso.getAno() == ano)
                        .findFirst();

                if (tempoUsoExistente.isPresent()) {
                    // Se existir, incrementa a contagem de mensagens
                    tempoUsoExistente.get().addQntMensagens();
                } else {
                    // Se não existir, adiciona o novo TempoUso à lista
                    usuarioTempoUso.addTempoUso(tempoUsoTemp);
                    // Inicializa a contagem de mensagens para esse TempoUso
                    tempoUsoTemp.addQntMensagens();
                }
            }
        }

        // Converte o mapa em uma lista
        return new ArrayList<>(userTimeMap.values());
    }
}
