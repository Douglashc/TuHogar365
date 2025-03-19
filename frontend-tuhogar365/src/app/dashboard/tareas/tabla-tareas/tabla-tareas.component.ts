import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormCrearTareaComponent } from '../form-crear-tarea/form-crear-tarea.component';
import { PusherService } from '@core/service/pusher.service';
import { TareaService } from '@core/service/tarea.service';
import Swal from 'sweetalert2';

import Pusher from 'pusher-js';
import { TokenStorageService } from '@core/authentication/token-storage.service';

@Component({
  selector: 'app-tabla-tareas',
  templateUrl: './tabla-tareas.component.html',
  styleUrl: './tabla-tareas.component.scss'
})
export class TablaTareasComponent implements OnInit, OnDestroy {

  nombreColumnas: string[] = [
    'Nº',
    'Titulo',
    'Proyecto',
    //'Descripcion',
    //'Fecha Inicio',
    'Fecha Final',
    'Estado',
    'Asignado',
    //'Registro',
    'Acciones'
  ];

  public tareas: any;

  paginado!: MatTableDataSource<any>;

  pusher: Pusher;
  channel: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private tareaService: TareaService,
    private pusherService: PusherService,
    private dialog: MatDialog,
    public tokenStorage: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.listarTareas();
    this.subscribirChannel();
  }

  ngOnDestroy(): void {
    this.pusherService.unsubscribeChannel();
  }

  subscribirChannel() {
    const token = this.tokenStorage.getToken();
    const user = this.tokenStorage.getUser();

    if (token && user?.id) {
      this.pusherService.listenToData(user?.id, (dataTarea: any) => {
        console.log("INFORMACION TAREA TIEMPO REAL: ", dataTarea);
        console.log('Nueva tarea asignada a ti:', dataTarea);
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: dataTarea?.titulo,
          showConfirmButton: true
        });
        this.actualizarListaTareas(dataTarea);
      });
    } else {
      console.log("Token o User ID no válidos");
    }
  }

  listarTareas() {
    this.tareaService.getAll().subscribe(data => {
      console.log("Tareas: ", data?.data);
      this.tareas = data?.data;
      this.paginado = new MatTableDataSource<any>(this.tareas);
      this.paginado.paginator = this.paginator;
    })
  }

  actualizarListaTareas(tarea: any) {
    this.tareas.unshift(tarea); // Agrega la nueva tarea al inicio
    this.paginado.data = [...this.tareas]; // Actualiza la data de MatTableDataSource
  }

  create() {
    const dialogRef = this.dialog.open(FormCrearTareaComponent, {
      data: {
        estado: false,
        title: 'Nueva Tarea'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarTareas()
      }
    });
  }

  editarTarea(id: any) {
    const dialogRef = this.dialog.open(FormCrearTareaComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarTareas()
      }
    });
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }
}
