import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-fluxo-de-pessoas',
  templateUrl: './fluxo-de-pessoas.component.html',
  styleUrls: ['./fluxo-de-pessoas.component.css']
})
export class FluxoDePessoasComponent implements OnInit {

  EntradaSaidas: any[] = [];

  entradaChartData: any[] = [];
  saidaChartData: any[] = [];
  
  mesChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  errorChart: boolean = false;
  errorMessage: string = '';

  apiURL = environment.apiUrl
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.carregarEntradaSaida()
  }

  downloadAsPDF() {
    const element = document.getElementById('contentToDownload');
    if (!element) return;
  
    const fileName = prompt('Digite o nome do arquivo:', 'fluxo-de-pessoas');
    if (!fileName) return;
  
    html2canvas(element).then((canvas) => {
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4: 210mm x 297mm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Obter largura e altura do canvas
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      // Calcular proporção para encaixar no tamanho do PDF
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;
  
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(
        imgData, 
        'PNG', 
        (pdfWidth - imgScaledWidth) / 2, // Centralizar horizontalmente
        (pdfHeight - imgScaledHeight) / 2, // Centralizar verticalmente
        imgScaledWidth, 
        imgScaledHeight
      );
  
      pdf.save(`${fileName}.pdf`);
    });
  }
  
  carregarEntradaSaida(): void {

    this.http.get<any[]>(`${this.apiURL}api/registro/obter-entradas-saidas`).subscribe(
      (data) => {
        console.log('Dados carregados:', data);
        this.EntradaSaidas = data;
        this.atualizarGraficos();
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  } 
  
  atualizarGraficos(): void {
    const entradasPorMes = Array(12).fill(0);
    const saidasPorMes = Array(12).fill(0);
  
    this.errorChart = false;
    try {
      this.EntradaSaidas.forEach(registro => {
        const [mesStr, anoStr] = registro.mes.split('/');
        const mes = parseInt(mesStr, 10) - 1;
        entradasPorMes[mes] += registro.entradas;
        saidasPorMes[mes] += registro.saidas;
      });
    
      this.entradaChartData = [{
        data: entradasPorMes,
        label: 'Entradas',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }];
    
      this.saidaChartData = [{
        data: saidasPorMes,
        label: 'Saídas',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }];
    } catch (error) {
      console.error('Erro ao atualizar gráficos:', error);
      this.errorChart = true;
      this.errorMessage = 'Erro ao atualizar gráficos. Por favor, verifique seu arquivo e tente novamente.';
    }
  }
  
}
