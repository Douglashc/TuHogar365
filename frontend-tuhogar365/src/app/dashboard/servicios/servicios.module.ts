import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TablaServiciosComponent } from './tabla-servicios/tabla-servicios.component';
import { FormCrearServiciosComponent } from './form-crear-servicios/form-crear-servicios.component';
import { WebMaterialModule } from 'app/webmaterial.module';

@NgModule({
  declarations: [
    TablaServiciosComponent,
    FormCrearServiciosComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    ServiciosRoutingModule,
    WebMaterialModule
  ]
})
export class ServiciosModule { }
