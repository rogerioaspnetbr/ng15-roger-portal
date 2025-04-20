import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RendaFixaComponent } from './renda-fixa.component';
import { LoteComponent } from './lote/lote.component';

const routes: Routes = [
  {
    path: '',
    component: RendaFixaComponent,
    children: [
      { path: 'lote', component: LoteComponent },
      { path: '', redirectTo: 'lote', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RendaFixaRoutingModule { }
