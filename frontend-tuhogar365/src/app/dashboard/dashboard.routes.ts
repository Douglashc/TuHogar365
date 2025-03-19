import { Route } from "@angular/router";
import { Page404Component } from "../authentication/page404/page404.component";
import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { Page403Component } from "./page403/page403.component";
import { RoleGuard } from "@core/guard/role.guard";

export const DASHBOARD_ROUTE: Route[] = [
  {
    path: "",
    redirectTo: "dashboard1",
    pathMatch: "full",
  },
  {
    path: "dashboard1",
    component: Dashboard1Component,
    canActivate: [RoleGuard],
    data: { roles: ['administrador', 'lider'] }
  },
  {
    path: "dashboard2",
    component: Dashboard2Component,
  },
  { path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] }
  },
  {
    path: 'equipos',
    loadChildren: () => import('./equipos/equipos.module').then(m => m.EquiposModule),
    canActivate: [RoleGuard],
    data: { roles: ['administrador', 'lider', 'empleado'] }
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule),
    canActivate: [RoleGuard],
    data: { roles: ['administrador', 'lider', 'empleado'] }
  },
  {
    path: 'calendario-plazos',
    loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioModule),
    canActivate: [RoleGuard],
    data: { roles: ['administrador','lider','empleado'] }
  },
  {
    path: 'tareas',
    loadChildren: () => import('./tareas/tareas.module').then(m => m.TareasModule),
    canActivate: [RoleGuard],
    data: { roles: ['administrador','lider','empleado'] }
  },
  
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.module').then(m => m.ReservasModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: '403',
    component: Page403Component
  },
  { path: "**", component: Page404Component },
];

