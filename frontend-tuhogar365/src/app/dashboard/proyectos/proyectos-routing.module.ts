import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableProyectosComponent } from './table-proyectos/table-proyectos.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TableProyectosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
