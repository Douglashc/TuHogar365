import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablaEquiposComponent } from './tabla-equipos/tabla-equipos.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TablaEquiposComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquiposRoutingModule { }
