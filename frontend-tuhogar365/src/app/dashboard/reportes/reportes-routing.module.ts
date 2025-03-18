import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteProcedimientosComponent } from './reporte-procedimientos/reporte-procedimientos.component';
import { AuthGuard } from '@core/guard/auth.guard';

const routes: Routes = [
  {
    path: 'reporte-procedimientos',
    component: ReporteProcedimientosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
