package br.com.zapdados.model;

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
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public class RegistroEntradaSaida {
    private String mes;
    private int entradas;
    private int saidas;

    public RegistroEntradaSaida(String mes, int entradas, int saidas){
        this.mes = mes;
        this.entradas = 0;
        this.saidas = 0;
    }

    public void addEntradas(){
        this.entradas++;
    }

    public void addSaidas(){
        this.saidas++;
    }
}
