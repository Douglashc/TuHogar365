import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { RoleGuard } from '@core/guard/role.guard';

import { TablaTareasComponent } from './tabla-tareas/tabla-tareas.component';

const routes: Routes = [
  {
    path: '',
    component: TablaTareasComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareasRoutingModule { }
