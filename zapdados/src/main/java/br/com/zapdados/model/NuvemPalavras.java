package br.com.zapdados.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public class NuvemPalavras {
    private int frequencia;
    private String palavra;

    public NuvemPalavras(String palavra, int frequencia){
        this.palavra = palavra;
        this.frequencia = frequencia;
    }
}
