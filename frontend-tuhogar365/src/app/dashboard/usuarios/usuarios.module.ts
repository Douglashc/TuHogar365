import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { WebMaterialModule } from 'app/webmaterial.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    ListaUsuariosComponent,
    CrearUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    WebMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    FileUploadComponent
  ]
})
export class UsuariosModule { }
