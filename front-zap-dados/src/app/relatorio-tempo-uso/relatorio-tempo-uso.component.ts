import { Component } from '@angular/core';

@Component({
  selector: 'app-relatorio-tempo-uso',
  templateUrl: './relatorio-tempo-uso.component.html',
  styleUrls: ['./relatorio-tempo-uso.component.css']
})
export class RelatorioTempoUsoComponent {
  timeOfDayChartData = [{ data: [3, 5, 7, 4], label: 'User 1', backgroundColor: '#FF6384' },
                        { data: [1, 2, 3, 4], label: 'User 2', backgroundColor: '#36A2EB' },
                        { data: [6, 4, 2, 1], label: 'User 3', backgroundColor: '#FFCE56' }];
                        
  timeOfDayChartLabels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00',
                          '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', 
                          '21:00', '22:00', '23:00'];
  timeOfDayChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, 
      },
    },
    scales: {
      x: {
        stacked: true, 
      },
      y: {
        stacked: true,
      }
    }
  };

  dayOfWeekChartData = [{ data: [3, 5, 7, 4], label: 'User 1', backgroundColor: '#FF6384' },
                        { data: [1, 2, 3, 4], label: 'User 2', backgroundColor: '#36A2EB' },
                        { data: [6, 4, 2, 1], label: 'User 3', backgroundColor: '#FFCE56' }];
  dayOfWeekChartLabels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  dayOfWeekChartOptions = {
    responsive: true,
    
  };
}
