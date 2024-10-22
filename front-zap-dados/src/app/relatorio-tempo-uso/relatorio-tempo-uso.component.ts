import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-relatorio-tempo-uso',
  templateUrl: './relatorio-tempo-uso.component.html',
  styleUrls: ['./relatorio-tempo-uso.component.css']
})
export class RelatorioTempoUsoComponent implements OnInit {
  usuarios: any[] = [];
  timeOfDayChartData: any[] = [];
  dayOfWeekChartData: any[] = [];

  timeOfDayChartLabels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
                          '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', 
                          '22:00', '23:00'];

  dayOfWeekChartLabels = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'];

  imagem: string = environment.production ? '/front-zap-dados/assets/logo-zapdados.jpg' : '../../assets/logo-zapdados.jpg' ;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.http.get<any[]>('http://localhost:8080/api/tempo-uso/obter-dados-relatorio').subscribe(
      (data) => {
        this.usuarios = data;
        this.atualizarGraficos();
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }
  
  atualizarGraficos(): void {

    this.timeOfDayChartData = this.usuarios.flatMap((tempo) =>
      tempo.qtdUso.map((uso: any) => ({
        data: Array(24).fill(0).map((_, i) => (i === tempo.horaDoDia ? uso.quantidadeMensagens : 0)),
        label: uso.username,
        backgroundColor: this.gerarCorAleatoria(),
      }))
    );
  
    this.dayOfWeekChartData = this.usuarios.flatMap((tempo) =>
      tempo.qtdUso.map((uso: any) => ({
        data: this.dayOfWeekChartLabels.map((dia) => (dia === tempo.diaSemana ? uso.quantidadeMensagens : 0)),
        label: uso.username,
        backgroundColor: this.gerarCorAleatoria(),
      }))
    );
  }

  gerarCorAleatoria(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
