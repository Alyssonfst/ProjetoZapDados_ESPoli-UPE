import { Component } from '@angular/core';

@Component({
  selector: 'app-relatorio-expressoes-usadas',
  templateUrl: './relatorio-expressoes-usadas.component.html',
  styleUrls: ['./relatorio-expressoes-usadas.component.css']
})
export class RelatorioExpressoesUsadasComponent {
  wordCounts: { word: string, count: number }[] = [];

  // Método chamado quando o arquivo é selecionado
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        this.processText(content);
      };
      reader.readAsText(file);
    }
  }

  // Processa o texto e conta as palavras mais frequentes
  processText(text: string): void {
    const words = text.toLowerCase().match(/\b\w+\b/g); // Divide o texto em palavras
    const wordMap: { [key: string]: number } = {};

    // Conta a frequência de cada palavra
    words?.forEach(word => {
      wordMap[word] = (wordMap[word] || 0) + 1;
    });

    // Transforma o mapa de palavras em uma lista ordenada
    this.wordCounts = Object.keys(wordMap)
      .map(key => ({ word: key, count: wordMap[key] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Pega as 10 expressões mais frequentes
  }
}

