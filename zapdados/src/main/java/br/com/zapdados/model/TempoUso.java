package br.com.zapdados.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
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
    private List<QtdUso> qtdUso;
}
