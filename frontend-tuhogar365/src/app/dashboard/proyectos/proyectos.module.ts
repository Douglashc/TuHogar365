import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TableProyectosComponent } from './table-proyectos/table-proyectos.component';

@NgModule({
  declarations: [
    TableProyectosComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    BreadcrumbComponent,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ]
})
export class ProyectosModule { }
