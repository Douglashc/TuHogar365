import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TablaClientesComponent,
    canActivate: [AuthGuard]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
