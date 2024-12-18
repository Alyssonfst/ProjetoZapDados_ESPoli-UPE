import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Chart } from 'chart.js'; // Importa o Chart.js

@Component({
  selector: 'app-introducao',
  templateUrl: './introducaoComponent.component.html',
  styleUrls: ['./introducaoComponent.component.css'],
})
export class IntroducaoComponentComponent implements OnInit {
  
  LogoPath = `${environment.imageBasePath}logo-zapdados.png`;

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
    const messagesData = [
      5, 10, 15, 20, 25, 30, 35, 30, 25, 20, 15, 10, 5, 8, 12, 18, 22, 28, 35,
      40, 30, 20, 15, 10,
    ];

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: hours,
        datasets: [
          {
            label: 'Todos os Usuários',
            data: messagesData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantidade de Mensagens',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Horários',
            },
          },
        },
      },
    });
  }
}
