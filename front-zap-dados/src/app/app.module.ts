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
import { FiltroComponentComponent } from './filtro-component/filtro-component.component';
import { IntroducaoComponentComponent } from './introducaoComponent/introducaoComponent.component';
import { FluxoDePessoasComponent } from './fluxo-de-pessoas/fluxo-de-pessoas.component';
import { RelatorioUltimasMensagensComponent } from './relatorio-ultimas-mensagens/relatorio-ultimas-mensagens.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TelaRelatoriosComponent } from './tela-relatorios/tela-relatorios.component';


@NgModule({
  declarations: [
    AppComponent,
    RelatorioTempoUsoComponent,
    RelatorioExpressoesUsadasComponent,
    LoginComponent,
    HomeComponent,
    CarregarArquivoComponent,
    FiltroComponentComponent,
    IntroducaoComponentComponent,
    FluxoDePessoasComponent,
    RelatorioUltimasMensagensComponent,
    CadastroComponent,
    FooterComponent,
    NavbarComponent,
    TelaRelatoriosComponent
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
