import { RouteInfo } from './sidebar.metadata';
export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Principal',
    iconType: '',
    icon: '',
    class: '',
    groupTitle: true,
    badge: '',
    badgeClass: '',
    submenu: [],
  },
  {
    path: 'dashboard/dashboard1',
    title: 'Dashboard',
    iconType: 'feather',
    icon: 'home',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador','lider']
  },
  {
    path: 'dashboard/usuarios',
    title: 'Usuarios',
    iconType: 'feather',
    icon: 'user',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador']
  },
  {
    path: 'dashboard/equipos',
    title: 'Equipos',
    iconType: 'feather',
    icon: 'users',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador','lider','empleado']
  },
  {
    path: 'dashboard/proyectos',
    title: 'Proyectos',
    iconType: 'feather',
    icon: 'folder',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador','lider','empleado']
  },
  {
    path: 'dashboard/tareas',
    title: 'Tareas',
    iconType: 'feather',
    icon: 'clipboard',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador','lider','empleado']
  },
  {
    path: 'dashboard/calendario-plazos',
    title: 'Plazos Tareas',
    iconType: 'feather',
    icon: 'calendar',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador','lider','empleado']
  },
  /*{
    path: 'dashboard/clientes',
    title: 'Clientes',
    iconType: 'feather',
    icon: 'user-check',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador']
  },*/
  /*{
    path: 'dashboard/servicios',
    title: 'Servicios',
    iconType: 'feather',
    icon: 'briefcase',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador']
  },*/
  /*{
    path: 'dashboard/reservas',
    title: 'Reservas',
    iconType: 'feather',
    icon: 'calendar',
    class: '',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    submenu: [],
    roles: ['administrador','empleado']
  },*/
  /*{
    path: '',
    title: 'Reportes',
    iconType: 'feather',
    icon: 'package',
    class: 'menu-toggle',
    groupTitle: false,
    badge: '',
    badgeClass: '',
    roles: ['administrador'],
    submenu: [
      {
        path: 'dashboard/reportes/reporte-procedimientos',
        title: 'Procedimientos',
        iconType: 'feather',
        icon: 'activity',
        class: '',
        groupTitle: false,
        badge: '',
        badgeClass: '',
        submenu: [],
        roles: ['administrador','doctor']
      },
    ]
  },*/
];
