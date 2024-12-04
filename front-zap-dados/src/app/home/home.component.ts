import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  LogoSloganPath = `${environment.imageBasePath}logo-slogan.png`;

  constructor() { }

  imagem: string = environment.production ? '/front-zap-dados/assets/ZAPDADOS_fundobranco_slogan.png' : '../../assets/ZAPDADOS_fundobranco_slogan.png' ;

  ngOnInit(): void {
  }

}
