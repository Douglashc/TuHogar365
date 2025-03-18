import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';

import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { FormCrearClientesComponent } from './form-crear-clientes/form-crear-clientes.component';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebMaterialModule } from 'app/webmaterial.module';

@NgModule({
  declarations: [
    TablaClientesComponent,
    FormCrearClientesComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    WebMaterialModule
  ]
})
export class ClientesModule { }
