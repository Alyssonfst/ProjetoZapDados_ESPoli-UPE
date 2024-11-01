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
public class TempoUso {
    private int horaDoDia;
    private String diaSemana;
    private int dia;
    private int mes;
    private int ano;
    private int qntMensagens;

    public TempoUso(int horaDoDia, String diaSemana, int dia, int mes, int ano) {
        this.horaDoDia = horaDoDia;
        this.diaSemana = diaSemana;
        this.dia = dia;
        this.mes = mes;
        this.ano = ano;
        this.qntMensagens = 0;
    }
    public void addQntMensagens(){
        this.qntMensagens++;
    }
}
