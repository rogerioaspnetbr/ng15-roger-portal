import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RendaFixaRoutingModule } from './renda-fixa-routing.module';
import { RendaFixaComponent } from './renda-fixa.component';
import { LoteComponent } from './lote/lote.component';

@NgModule({
  declarations: [
    RendaFixaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RendaFixaRoutingModule,
    LoteComponent
  ]
})
export class RendaFixaModule { }
