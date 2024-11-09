import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Chart } from 'chart.js'; // Importa o Chart.js

@Component({
  selector: 'app-introducao-component',
  templateUrl: './introducao-component.component.html',
  styleUrls: ['./introducao-component.component.css']
})
export class IntroducaoComponentComponent implements OnInit {

  imagem: string = environment.production ? '/front-zap-dados/assets/logo-zapdados.jpg' : '../../assets/logo-zapdados.jpg';
  chart: any;

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('userChart') as HTMLCanvasElement;

    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const messagesData = [5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10, 5,
                          8, 12, 18, 22, 28, 35, 40, 30, 20, 15, 10];

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: hours,
        datasets: [{
          label: 'Todos os Usuários',
          data: messagesData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantidade de Mensagens'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Horários'
            }
          }
        }
      }
    });
  }
}
