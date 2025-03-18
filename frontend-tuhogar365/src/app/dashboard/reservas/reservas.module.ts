import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasRoutingModule } from './reservas-routing.module';

import { TablaReservasComponent } from './tabla-reservas/tabla-reservas.component';
import { FormCrearReservasComponent } from './form-crear-reservas/form-crear-reservas.component';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from 'app/webmaterial.module';

@NgModule({
  declarations: [
    TablaReservasComponent,
    FormCrearReservasComponent
  ],
  imports: [
    CommonModule,
    ReservasRoutingModule,
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    WebMaterialModule
  ]
})
export class ReservasModule { }
