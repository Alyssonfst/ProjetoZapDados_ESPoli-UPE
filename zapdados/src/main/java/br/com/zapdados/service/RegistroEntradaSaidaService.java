package br.com.zapdados.service;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import org.springframework.stereotype.Service;

import br.com.zapdados.model.RegistroEntradaSaida;
import br.com.zapdados.model.Txt;

@Service
public class RegistroEntradaSaidaService {
    private static final DateTimeFormatter MONTH_YEAR_FORMAT = DateTimeFormatter.ofPattern("MM/yyyy");

    public List<RegistroEntradaSaida> calcularEntradasESaidasMensalmente(List<Txt> mensagens) {
        Map<String, RegistroEntradaSaida> registroMap = new HashMap<>();

        for (Txt mensagem : mensagens) {
            try {
                LocalDateTime dateTime = mensagem.getDateTime();
                String texto = mensagem.getMensagem();
                String mes = dateTime.format(MONTH_YEAR_FORMAT);

                // Obtém ou cria o registro para o mês correspondente
                RegistroEntradaSaida registro = registroMap.computeIfAbsent(mes, k -> new RegistroEntradaSaida(mes, 0, 0));

                // Verifica se é uma entrada ou saída e incrementa a contagem correspondente
                if (texto.contains("entrou usando o link de convite deste grupo")) {
                    registro.addEntradas();
                } else if (texto.contains("entrou neste grupo através da comunidade")) {
                    registro.addEntradas();
                }else if (texto.contains("saiu") && !texto.matches(".*:\\s.*")) {
                    registro.addSaidas();
                }

            } catch (DateTimeException e) {
                System.out.println("Mensagem ignorada, formato de data inválido: " + mensagem);
            }
        }

        // Retorna a lista de registros com entradas e saídas mensais
        return new ArrayList<>(registroMap.values());
    }
}
