import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatorioTempoUsoComponent } from './relatorio-tempo-uso/relatorio-tempo-uso.component';
import { RelatorioExpressoesUsadasComponent } from './relatorio-expressoes-usadas/relatorio-expressoes-usadas.component';

const routes: Routes = [
  { path: 'relatorio-tempo-uso', component: RelatorioTempoUsoComponent },
  {path:'relatorio-expressoes-usadas', component: RelatorioExpressoesUsadasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
