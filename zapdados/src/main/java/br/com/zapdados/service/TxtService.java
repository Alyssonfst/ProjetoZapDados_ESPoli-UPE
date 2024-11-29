package br.com.zapdados.service;

import br.com.zapdados.model.Txt;
import br.com.zapdados.model.TxtResponse;
import org.springframework.stereotype.Service;

import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TxtService {

    private static final DateTimeFormatter DATE_FORMAT_OLD = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
    private static final DateTimeFormatter DATE_FORMAT_NEW = DateTimeFormatter.ofPattern("dd/MM/yyyy, HH:mm:ss");

    public List<TxtResponse> parseTxt(List<String> rawlines) {
        Map<String, List<Txt>> userTxtMap = new HashMap<>();

        LocalDateTime currentDateTime = null;
        String currentUsuario = null;
        StringBuilder currentMensagem = new StringBuilder();

        for (String line : rawlines) {
            try {
                if (line.startsWith("[")) {
                    // Novo formato: [dd/MM/yyyy, HH:mm:ss] ~Usuario: Mensagem
                    int closingBracketIndex = line.indexOf("]");
                    if (closingBracketIndex == -1 || !line.contains(":")) continue;

                    // Extrai data e hora
                    String dateTimeStr = line.substring(1, closingBracketIndex);
                    currentDateTime = LocalDateTime.parse(dateTimeStr, DATE_FORMAT_NEW);

                    // Extrai usuário e mensagem
                    int colonIndex = line.indexOf(":", closingBracketIndex);
                    if (colonIndex == -1) continue;

                    currentUsuario = line.substring(closingBracketIndex + 1, colonIndex).trim();
                    currentMensagem = new StringBuilder(line.substring(colonIndex + 1).trim());
                } else if (line.contains(" - ")) {
                    
                    // Formato antigo: dd/MM/yyyy HH:mm - Usuario: Mensagem
                    String[] dateAndRest = line.split(" - ", 2);
                    if (dateAndRest.length < 2) continue;

                    // Extrai data e hora
                    currentDateTime = LocalDateTime.parse(dateAndRest[0], DATE_FORMAT_OLD);

                    // Extrai usuário e mensagem
                    String texto = dateAndRest[1].trim();
                    if (texto.contains(": ")) {
                        int colonIndex = texto.indexOf(": ");
                        currentUsuario = texto.substring(0, colonIndex).trim();
                        currentMensagem = new StringBuilder(texto.substring(colonIndex + 2).trim());
                    } else {
                        currentUsuario = texto.split(" ")[0];
                        currentMensagem = new StringBuilder("");
                    }
                } else {
                    // Continua acumulando na mensagem anterior
                    if (currentMensagem.length() > 0) {
                        currentMensagem.append(" ").append(line.trim());
                    }
                }

                // Quando encontrar uma nova mensagem (ou a última linha for processada)
                if (currentDateTime != null && currentUsuario != null && currentMensagem.length() > 0) {
                    Txt txt = new Txt(currentDateTime, currentMensagem.toString());
                    userTxtMap.computeIfAbsent(currentUsuario, k -> new ArrayList<>()).add(txt);
                    currentMensagem.setLength(0); // Limpa a mensagem atual
                }
            } catch (DateTimeException | IndexOutOfBoundsException e) {
                System.out.println("Linha ignorada, formato inválido: " + line);
            }
        }

        // Converte o mapa em uma lista de respostas
        List<TxtResponse> response = new ArrayList<>();
        for (Map.Entry<String, List<Txt>> entry : userTxtMap.entrySet()) {
            response.add(new TxtResponse(entry.getKey(), entry.getValue()));
        }
        return response;
    }
}

