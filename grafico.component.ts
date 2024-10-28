import { Component } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'grafico',
  template: `
    <div>
      <angular-tag-cloud
        [data]="data"
        [width]="options.width"
        [height]="options.height"
        [overflow]="options.overflow">
      </angular-tag-cloud>
    </div>
  `,
  styleUrls: ['grafico.component.css']
})
export class GraficoComponent {
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  data: CloudData[] = [
    {text: 'Oi', weight: 20, tooltip:'20'}, //weight = quantidade de vezes
    {text: 'Boa noite', weight: 40, tooltip: '40'}, // tooltip = pode dizer quantas vezes foi falado
    {text: 'Bom dia' , weight: 50, tooltip: '50 '},
    {text: 'blz' , weight: 60, tooltip: '60 '},
    {text: 'vlw' , weight: 42, tooltip: '42 '},
    {text: 'tmj' , weight: 35, tooltip: '35 '},
    {text: 'pq' , weight: 29, tooltip: '29'},
    {text: 'mano' , weight: 18, tooltip: '18 '},
    {text: 'pfv' , weight: 24, tooltip: '24 '},
    {text: 'n' , weight: 34, tooltip: '34 '},
    {text: 'aff' , weight: 10, tooltip: '10 '},
    {text: 'pf' , weight: 19, tooltip: '19 '}
    // ...
  ];
}
