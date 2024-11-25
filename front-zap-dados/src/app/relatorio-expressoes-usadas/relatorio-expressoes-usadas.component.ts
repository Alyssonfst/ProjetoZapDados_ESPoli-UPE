import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-relatorio-expressoes-usadas',
  templateUrl: './relatorio-expressoes-usadas.component.html',
  styleUrls: ['./relatorio-expressoes-usadas.component.css']
})
export class RelatorioExpressoesUsadasComponent implements OnInit {
  
  private apiURL = environment.apiUrl;
  
  wordChartData: any[] = [];
  wordChartLabels: string[] = [];

  errorChart: boolean = false;
  messageErrorChart: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchWordData();
  }

  downloadAsPDF() {
    const element = document.getElementById('contentToDownload');
    if (!element) return;
  
    const fileName = prompt('Digite o nome do arquivo:', 'relatorio-palavras-mais-usadas');
    if (!fileName) return;
  
    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth(); 
      const pdfHeight = pdf.internal.pageSize.getHeight(); 
  
      const imgWidth = canvas.width; 
      const imgHeight = canvas.height; 
  
      
      const scale = pdfWidth / imgWidth; 
      const imgScaledWidth = pdfWidth; 
      const imgScaledHeight = imgHeight * scale; 
  
      const imgData = canvas.toDataURL('image/png');
  
      const yOffset = imgScaledHeight > pdfHeight ? 0 : (pdfHeight - imgScaledHeight) / 2;
  
      pdf.addImage(
        imgData,
        'PNG',
        0, 
        yOffset,
        imgScaledWidth,
        imgScaledHeight
      );
  
      pdf.save(`${fileName}.pdf`);
    });
  }
  
  fetchWordData(): void {
    const url = `${this.apiURL}api/nuvem-palavras/obter-nuvem-palavras`;

    this.errorChart = false;
    this.messageErrorChart = '';

    this.http.get<{ palavra: string, frequencia: number }[]>(url).subscribe({
      next: (data) => {
        try {
          const topWords = data.slice(0, 10);
          this.wordChartLabels = topWords.map(item => item.palavra);
          this.wordChartData = [
            {
              data: topWords.map(item => item.frequencia),
              label: 'Frequência de Palavras',
            },
          ];
          this.errorChart = false;
        } catch (err) {
          console.error('Erro ao processar dados:', err);
          this.errorChart = true;
          this.messageErrorChart = 'Erro ao processar os dados. Verifique seu arquivo e tente novamente.';
        }
      },
      error: (error) => {
        console.error('Erro ao buscar dados:', error);
        this.errorChart = true;
        
      },
    });
  }    
}