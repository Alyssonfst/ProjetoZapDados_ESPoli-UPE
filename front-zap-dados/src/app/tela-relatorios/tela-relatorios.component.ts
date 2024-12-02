import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-relatorios',
  templateUrl: './tela-relatorios.component.html',
  styleUrls: ['./tela-relatorios.component.css'],
})
export class TelaRelatoriosComponent {
  // Variável para controlar qual relatório exibir
  currentReport: string = ''; // Pode ser 'tempo-uso', 'ultimas-palavras', 'expressoes-usadas', ou 'fluxo-pessoas'

  // Métodos para alterar a variável currentReport e exibir o relatório correspondente
  mostrarRelatorio(tipo: string) {
    this.currentReport = tipo;
  }
}
