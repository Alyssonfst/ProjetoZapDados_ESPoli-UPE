package br.com.zapdados.service;

import br.com.zapdados.model.Txt;
import br.com.zapdados.model.TxtResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TxtService {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    public List<TxtResponse> parseTxt(List<String> rawlines){
        Map<String, List<Txt>> userTxtMap = new HashMap<>();

        for(String line : rawlines) {
            try {

                if (!line.contains(" - ")) {
                    continue;
                }

                String[] dateAndRest = line.split(" - ", 2);
                if (dateAndRest.length < 2) {
                    continue;
                }

                String[] userAndText = dateAndRest[1].split(": ", 2);
                if (userAndText.length < 2) {
                    continue;
                }

                LocalDateTime dateTime = LocalDateTime.parse(dateAndRest[0], DATE_FORMAT);
                String usuario = userAndText[0];
                String texto = userAndText[1];

                Txt txt = new Txt(dateTime, texto);

                userTxtMap.computeIfAbsent(usuario, k -> new ArrayList<>()).add(txt);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        List<TxtResponse> response = new ArrayList<>();
        for(Map.Entry<String, List<Txt>> entry : userTxtMap.entrySet()){
            response.add(new TxtResponse(entry.getKey(), entry.getValue()));
            }
        return response;
    }
}
