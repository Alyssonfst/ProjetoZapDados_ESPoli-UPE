import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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

  apiURL = environment.apiUrl
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.carregarEntradaSaida()
    this.atualizarGraficos()
  }

  carregarEntradaSaida(): void {

    this.http.get<any[]>(`${this.apiURL}api/registro/obter-entradas-saidas`).subscribe(
      (data) => {
        console.log('Dados carregados:', data);
        this.EntradaSaidas = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  } 
  
  atualizarGraficos(): void {
    const entradasPorMes = Array(12).fill(0);
    const saidasPorMes = Array(12).fill(0);
  
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
  }
  
}
