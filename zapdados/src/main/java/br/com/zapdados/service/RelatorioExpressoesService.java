/* package br.com.zapdados.service;

import edu.stanford.nlp.pipeline.*;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

@Service
public class RelatorioExpressoesService {

    private StanfordCoreNLP pipeline;

    public RelatorioExpressoesService() {
        try {
            // Configurar as propriedades do pipeline
            Properties props = new Properties();
            props.setProperty("annotators", "tokenize,ssplit,pos,lemma,ner");
            props.setProperty("outputFormat", "json");
            props.setProperty("language", "pt"); // Definindo o idioma para português

            // Inicializar o pipeline
            this.pipeline = new StanfordCoreNLP(props);
        } catch (Exception e) {
            // Log de erro para rastreamento
            e.printStackTrace();
        }
    }

    public Map<String, Integer> processarExpressoes(List<String> mensagens) {
        Map<String, Integer> expressoes = new HashMap<>();

        // Se o pipeline não foi inicializado, retornar um erro
        if (this.pipeline == null) {
            System.err.println("Pipeline não foi inicializado corretamente!");
            return expressoes;
        }

        // Processar as mensagens normalmente
        for (String mensagem : mensagens) {
            CoreDocument document = new CoreDocument(mensagem);
            pipeline.annotate(document);

            for (CoreSentence sentence : document.sentences()) {
                String[] tokens = sentence.tokens().stream()
                        .map(token -> token.word())
                        .toArray(String[]::new);

                for (String token : tokens) {
                    expressoes.put(token, expressoes.getOrDefault(token, 0) + 1);
                }
            }
        }

        return expressoes;
    }
}
 */