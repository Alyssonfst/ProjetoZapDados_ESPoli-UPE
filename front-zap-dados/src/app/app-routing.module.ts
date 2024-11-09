import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioTempoUsoComponent } from './relatorio-tempo-uso/relatorio-tempo-uso.component';
import { RelatorioExpressoesUsadasComponent } from './relatorio-expressoes-usadas/relatorio-expressoes-usadas.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarregarArquivoComponent } from './carregar-arquivo/carregar-arquivo.component';
import { IntroducaoComponentComponent } from './introducao-component/introducao-component.component';
import { FluxoDePessoasComponent } from './fluxo-de-pessoas/fluxo-de-pessoas.component';

const routes: Routes = [
  { path: '', redirectTo: '/introducao', pathMatch: 'full' }, // Redireciona a raiz para 'home'
  { path: 'login', component: LoginComponent },
  { path: 'relatorio-tempo-uso', component: RelatorioTempoUsoComponent, canActivate: [AuthGuard] },
  { path: 'relatorio-expressoes-usadas', component: RelatorioExpressoesUsadasComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'carregar-arquivo', component: CarregarArquivoComponent, canActivate: [AuthGuard]},
  { path: 'introducao', component: IntroducaoComponentComponent},
  { path: 'fluxo-de-pessoas', component: FluxoDePessoasComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
