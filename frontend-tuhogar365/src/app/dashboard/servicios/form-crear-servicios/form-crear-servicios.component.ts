import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PeriodosService } from '@core/service/periodos.service';
import { ServiciosService } from '@core/service/servicios.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-crear-servicios',
  templateUrl: './form-crear-servicios.component.html',
  styleUrl: './form-crear-servicios.component.scss'
})
export class FormCrearServiciosComponent {

  form!: FormGroup;
  submitted = false;
  loading = false;
  universidades: any;
  periodos: any;
  servicio: any;

  constructor(
    public dialogRef: MatDialogRef<FormCrearServiciosComponent>,
    private fb: FormBuilder,
    private periodosServidos: PeriodosService,
    private servicioService: ServiciosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listarPeriodos();
    if (this.data.estado === true) {
      this.getById();
    }
  }

  getById() {
    this.servicioService.getById(this.data.id).subscribe(data => {
      console.log("Servicio: ", data);
      this.servicio = data?.data;
      this.form.patchValue({
        nombre: this.servicio.nombre,
        responsable: this.servicio.responsable,
        titulo: this.servicio.titulo,
        periodo_id: this.servicio.periodo_id,
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      responsable: [''],
      titulo: [''],
      universidad_id: [1],
      periodo_id: ['', Validators.required],
    });
  }

  listarPeriodos() {
    // Cargar los periodos desde un servicio
    this.periodosServidos.getAll().subscribe(data => {
      this.periodos = data?.data;
    });
  }

  registerServicio() {
    this.submitted = true;
    this.loading = true;

    if (this.data.estado === true) {
      this.servicioService
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
              title: 'Servicio editado con éxito',
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
      this.servicioService
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
              title: 'Servicio creado con éxito',
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
