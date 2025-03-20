import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';

import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';
import { DetalleEquipoComponent } from './detalle-equipo/detalle-equipo.component';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    TablaEquiposComponent,
    DetalleEquipoComponent
  ],
  imports: [
    CommonModule,
    EquiposRoutingModule,
    BreadcrumbComponent,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ]
})
export class EquiposModule { }
