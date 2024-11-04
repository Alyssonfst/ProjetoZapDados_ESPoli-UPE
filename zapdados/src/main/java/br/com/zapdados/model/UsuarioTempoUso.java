package br.com.zapdados.model;

import java.util.List;
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
public class UsuarioTempoUso {
    private String username;
    private List<TempoUso> temposUso;

    public void addTempoUso(TempoUso tempoUso){
        this.temposUso.add(tempoUso);
    }
}
