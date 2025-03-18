import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteProcedimientosComponent } from './reporte-procedimientos/reporte-procedimientos.component';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from 'app/webmaterial.module';

@NgModule({
  declarations: [
    ReporteProcedimientosComponent,
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    WebMaterialModule
  ]
})
export class ReportesModule { }
