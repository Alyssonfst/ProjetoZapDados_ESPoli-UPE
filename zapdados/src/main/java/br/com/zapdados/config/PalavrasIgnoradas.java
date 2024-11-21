package br.com.zapdados.config;

import java.util.Set;

public class PalavrasIgnoradas {

    private PalavrasIgnoradas() {
        // Construtor privado para impedir instância
    }

    public static final Set<String> LISTA = Set.of(
        "para", "com", "uma", "mais", "isso", 
        "como", "essa", "este", "esta", "que", "por",
        "grupo", "link", "convite", "deste", "neste", "através",
        "mídia", "oculta", "entrou", "usando", "saiu", "comunidade",
        "mensagem", "editada", "adicionadoa", "você", "onde",
        "aonde", "quando", "quem", "qual", "porque", "porquê",
        "kkk", "kkkkk", "pelo", "gente", "também", "estou", "minha",
        "esse", "ainda", "pode", "acho", "tudo", "nada", "kkkk","aqui",
        "muito", "sobre", "vocês"
    
        );
}
