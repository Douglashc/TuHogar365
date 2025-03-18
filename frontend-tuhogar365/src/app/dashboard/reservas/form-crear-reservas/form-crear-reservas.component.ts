import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservasService } from '@core/service/reservas.service';
import { ClientesService } from '@core/service/clientes.service';
import { ServiciosService } from '@core/service/servicios.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-crear-reservas',
  templateUrl: './form-crear-reservas.component.html',
  styleUrl: './form-crear-reservas.component.scss'
})
export class FormCrearReservasComponent {

  form!: FormGroup;
  submitted = false;
  loading = false;
  clientes: any;
  servicios: any;
  reserva: any

  constructor(
    public dialogRef: MatDialogRef<FormCrearReservasComponent>,
    private fb: FormBuilder,
    private reservaService: ReservasService,
    private clienteService: ClientesService,
    private servicioService: ServiciosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listarClientes();
    this.listarServicios();
    if (this.data.estado === true) {
      this.getById();
    }
  }

  getById() {
    this.reservaService.getById(this.data.id).subscribe(data => {
      console.log("Reserva: ", data);
      this.reserva = data?.data;
      this.form.patchValue({
        cliente_id: this.reserva.cliente_id,
        servicio_id: this.reserva.servicio_id,
        fecha_reserva: this.reserva.fecha_reserva,
        fecha_hora_inicio: this.reserva.fecha_hora_inicio,
        fecha_hora_fin: this.reserva.fecha_hora_fin
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      cliente_id: ['', Validators.required],
      servicio_id: ['', Validators.required],
      fecha_reserva: ['', Validators.required],
      fecha_hora_inicio: ['', Validators.required],
      fecha_hora_fin: ['', Validators.required],
    });
  }

  listarClientes() {
    this.clienteService.getAll().subscribe(data => {
      this.clientes = data?.data;
    });
  }

  listarServicios() {
    this.servicioService.getAll().subscribe(data => {
      this.servicios = data?.data;
    });
  }

  registerReserva() {
    this.submitted = true;
    this.loading = true;

    if (this.data.estado === true) {
      this.reservaService
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
              title: 'Reserva editada con éxito',
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
      this.reservaService
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
              title: 'Reserva creada con éxito',
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
