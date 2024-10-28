import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  imagem: string = environment.production ? '/front-zap-dados/assets/logo-zapdados.jpg' : '../../assets/logo-zapdados.jpg' ;

  ngOnInit(): void {
  }

}
