import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablaReservasComponent } from './tabla-reservas/tabla-reservas.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TablaReservasComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasRoutingModule { }
