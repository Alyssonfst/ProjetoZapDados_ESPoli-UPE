import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RelatorioTempoUsoComponent } from './relatorio-tempo-uso/relatorio-tempo-uso.component';
import { RelatorioExpressoesUsadasComponent } from './relatorio-expressoes-usadas/relatorio-expressoes-usadas.component';

import { NgChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { CarregarArquivoComponent } from './carregar-arquivo/carregar-arquivo.component';
import { APP_BASE_HREF } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    RelatorioTempoUsoComponent,
    RelatorioExpressoesUsadasComponent,
    LoginComponent,
    HomeComponent,
    CarregarArquivoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/front-zap-dados'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
