import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReservasService } from '@core/service/reservas.service';
import { FormCrearReservasComponent } from '../form-crear-reservas/form-crear-reservas.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-reservas',
  templateUrl: './tabla-reservas.component.html',
  styleUrl: './tabla-reservas.component.scss'
})
export class TablaReservasComponent implements OnInit {

  nombreColumnas: string[] = [
    'Nº',
    'Servicio',
    'Responsable',
    'Cliente',
    'Tipo Membresia',
    'Telefono',
    'Fecha Reserva',
    'Fecha Inicio',
    'Fecha Fin',
    'Acciones'
  ];

  public reservas: any;

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private reservasService: ReservasService,
    private dialog: MatDialog

  ) {

  }
  ngOnInit(): void {
    this.listarReservas();
  }


  listarReservas() {
    this.reservasService.getAll().subscribe(data => {
      this.reservas = data?.data;
      console.log("Reservas: ", this.reservas);
      this.paginado = new MatTableDataSource<any>(this.reservas);
      this.paginado.paginator = this.paginator;
    })
  }

  create() {
    const dialogRef = this.dialog.open(FormCrearReservasComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarReservas()
      }
    });
  }

  editarReserva(id: any) {
    const dialogRef = this.dialog.open(FormCrearReservasComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarReservas()
      }
    });
  }

  enableReserva(id: any) {
    this.reservasService.enabled(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listarReservas();
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
        this.listarReservas();
      }
    );
  }

  deleteReserva(id: any) {
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
        this.reservasService.delete(id).subscribe((data: any) => {
          Swal.fire(
            'Eliminado!',
            'Reserva eliminado.',
            'success'
          )
          this.listarReservas();
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
