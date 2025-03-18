import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TareasRoutingModule } from './tareas-routing.module';
import { TablaTareasComponent } from './tabla-tareas/tabla-tareas.component';
import { FormCrearTareaComponent } from './form-crear-tarea/form-crear-tarea.component';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TablaTareasComponent,
    FormCrearTareaComponent
  ],
  imports: [
    CommonModule,
    TareasRoutingModule,
    BreadcrumbComponent,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ]
})
export class TareasModule { }
