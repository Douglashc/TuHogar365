import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@core/service/user.service';
import { CrearUsuariosComponent } from '../crear-usuarios/crear-usuarios.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent implements OnInit {

  nombreColumnas: string[] = [
    'Nº',
    'Nombre Completo',
    'Nombre de Usuario',
    'Email',
    'Habilitado',
    'Rol',
    'Acciones'
  ];

  paginado!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor( private userService: UserService,
    private dialog: MatDialog    
    
    ) {
    
  }
  ngOnInit(): void {
    this.listaUsuarios();
  }


  listaUsuarios() {
    this.userService.getAll().subscribe(data=>{
      this.paginado = new MatTableDataSource<any>(data);
      this.paginado.paginator = this.paginator;  
    })
  }

  create(){
    const dialogRef = this.dialog.open(CrearUsuariosComponent, {
      data: {
        estado: false,
        title: 'Nuevo Registro'
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaUsuarios()
      }
    });
  }

  editar(id:any){
    const dialogRef = this.dialog.open(CrearUsuariosComponent, {
      data: {
        estado: true,
        title: 'Editar Registro',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaUsuarios()
      }
    });
  }

  enableUser(id: any) {
    this.userService.enabled(id).subscribe(
      (data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito',
          text: data.success,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaUsuarios();
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error ',
          text:  error.error,
          showConfirmButton: false,
          timer: 1500
        })
        this.listaUsuarios();
      }
    );
  }

  deleteUser(id: any) {
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
        this.userService.delete(id).subscribe( (data: any) => {
          Swal.fire(
            'Eliminado!',
            'Usuario eliminado.',
            'success'
          )
          this.listaUsuarios();
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
