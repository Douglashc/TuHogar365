import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from '@core/service/servicios.service';
import { FormCrearServiciosComponent } from '../form-crear-servicios/form-crear-servicios.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-servicios',
  templateUrl: './tabla-servicios.component.html',
  styleUrl: './tabla-servicios.component.scss'
})
export class TablaServiciosComponent {

  nombreColumnas: string[] = [
    'Nº',
    'Servicio',
    'Responsable',
    'Habilitado',
    'Descripcion',
    'Fecha Inicio',
    'Fecha Final',
    'Acciones'
  ];

  public servicios: any;

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private serviciosService: ServiciosService,
    private dialog: MatDialog

  ) {

  }
  ngOnInit(): void {
    this.listarServicio();
  }


  listarServicio() {
    this.serviciosService.getAll().subscribe(data => {
      this.servicios = data?.data;
      console.log("Servicios: ", this.servicios);
      this.paginado = new MatTableDataSource<any>(this.servicios);
      this.paginado.paginator = this.paginator;
    })
  }

  create() {
    const dialogRef = this.dialog.open(FormCrearServiciosComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarServicio()
      }
    });
  }

  editarServicio(id: any) {
    const dialogRef = this.dialog.open(FormCrearServiciosComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarServicio()
      }
    });
  }

  enableServicio(id: any) {
    this.serviciosService.enabled(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listarServicio();
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error ',
          text: error.error,
          showConfirmButton: false,
          timer: 1500
        })
        this.listarServicio();
      }
    );
  }

  deleteServicio(id: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: "¡Esta acción no podrá revertirce!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'primary',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bórralo!',
      cancelButtonText: 'No, cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.delete(id).subscribe((data: any) => {
          Swal.fire(
            'Eliminado!',
            'Servicio eliminado.',
            'success'
          )
          this.listarServicio();
        },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un problema',
              text: error.error
            });
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          'Cancelado',
          'Registro no eliminado',
          'error'
        )
      }
    })
  }

  applyFilters(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.paginado.filter = filterValue.trim().toLowerCase();
  }

}
