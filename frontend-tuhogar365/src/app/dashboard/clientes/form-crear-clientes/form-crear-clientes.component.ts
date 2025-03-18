import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from '@core';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-crear-clientes',
  templateUrl: './form-crear-clientes.component.html',
  styleUrl: './form-crear-clientes.component.scss'
})
export class FormCrearClientesComponent {

  form!: FormGroup;
  submitted = false;
  loading = false;

  public cliente: any;

  public notifications: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormCrearClientesComponent>,
    private fb: FormBuilder,
    private clientesService: ClientesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if (this.data.estado === true) {
      this.recuperarDatosClienteEditar();
    }
  }

  recuperarDatosClienteEditar() {
    this.clientesService.getById(this.data.id).subscribe(data => {
      console.log("Cliente: ", data);
      this.cliente = data?.data;
      this.form.patchValue({
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion,
        tipo: this.cliente.tipo,
        fecha_nacimiento: this.cliente.fecha_nacimiento,
        tipo_membresia: this.cliente.tipo_membresia,
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(8)]],
      direccion: [''],
      tipo: [''],
      fecha_nacimiento: ['', Validators.required],
      tipo_membresia: [''],
    });
  }

  registerCliente() {
    this.submitted = true;
    this.loading = true;

    if (this.data.estado === true) {
      this.clientesService
        .update(this.data.id, this.form.value)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.loading = false;
          })
        )
        .subscribe(
          data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente editado con éxito',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data);
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un problema',
              text: error.error,
            });
            this.submitted = false;
            this.loading = false;
          }
        );
    } else {
      this.clientesService
        .create(this.form.value)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.loading = false;
          })
        )
        .subscribe(
          data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente creado con éxito',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data);
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrió un problema',
              text: error.error,
            });
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }

}
