import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormCrearClientesComponent } from '../form-crear-clientes/form-crear-clientes.component';
import { ClientesService } from '@core/service/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-clientes',
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.scss'
})
export class TablaClientesComponent implements OnInit{

  nombreColumnas: string[] = [
    'Nº',
    'Nombre Completo',
    'Tipo Membresia',
    'Tipo',
    'Telefono',
    'Fecha Nacimiento',
    'Dirección',
    'Habilitado',
    'Fecha Registro',
    'Acciones'
  ];

  public clientes: any;

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listarClientes();
  }


  listarClientes() {
    this.clientesService.getAll().subscribe(data => {
      console.log("Clientes: ", data?.data);
      this.clientes = data?.data;
      this.paginado = new MatTableDataSource<any>(this.clientes);
      this.paginado.paginator = this.paginator;
    })
  }

  create() {
    const dialogRef = this.dialog.open(FormCrearClientesComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarClientes()
      }
    });
  }

  editarCliente(id: any) {
    const dialogRef = this.dialog.open(FormCrearClientesComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarClientes()
      }
    });
  }

  enableCliente(id: any) {
    this.clientesService.enabled(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listarClientes();
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
        this.listarClientes();
      }
    );
  }

  deleteCliente(id: any) {
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
        this.clientesService.delete(id).subscribe((data: any) => {
          Swal.fire(
            'Eliminado!',
            'Cliente eliminado.',
            'success'
          )
          this.listarClientes();
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
