import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@core/service/user.service';
import { EquipoService } from '@core/service/equipos.service';
import { TareaService } from '@core/service/tarea.service';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-crear-tarea',
  templateUrl: './form-crear-tarea.component.html',
  styleUrl: './form-crear-tarea.component.scss'
})
export class FormCrearTareaComponent implements OnInit {
  
  form!: FormGroup;
  submitted = false;
  loading = false;

  equipos: any;
  proyectos: any;

  usuarios: any;
  tarea: any;

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<FormCrearTareaComponent>,
    private fb: FormBuilder,
    private equiposService: EquipoService,
    private usuarioService: UserService,
    private tareaService: TareaService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createForm();
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listarEquipos();
    
    this.form.valueChanges.subscribe(data => {
      console.log("ID TEAM: ", data?.equipo_id);
      this.listarProyectos(data?.equipo_id);
      this.listarUsuariosEquipo(data?.equipo_id);
    });
    
    if (this.data.estado === true) {
      this.getById();
    }
  }

  getById() {
    this.tareaService.getById(this.data?.id).subscribe(data => {
      console.log("Tarea: ", data);
      this.tarea = data?.data;
      this.form.patchValue({
        ...this.tarea
      });
    });
  }

  createForm() {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_final: ['', Validators.required],
      equipo_id: ['', Validators.required],
      proyecto_id: ['', Validators.required],
      user_id_realiza: ['', Validators.required]
    });
  }

  listarEquipos() {
    this.equiposService.getAll().subscribe(
      data => {
        console.log("EQUIPOS: ", data);
        this.equipos = data?.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  listarProyectos(equipo_id){
    const equipo = this.equipos.filter(equipo => equipo?.id === equipo_id);
    this.proyectos = equipo[0]?.proyectos;
    console.log("PROYECTOS EQUIPO: ", this.proyectos);
  }   

  listarUsuariosEquipo(equipo_id) {
    const equipo = this.equipos.filter(equipo => equipo?.id === equipo_id);
    console.log("USUARIOS EQUIPO: ", equipo[0]);
    this.usuarios = equipo[0]?.usuarios;
    this.usuarios.push(equipo[0]?.lider);
  }

  /*listarUsuarios() {
    // Cargar los periodos desde un servicio
    this.usuarioService.getAll().subscribe(data => {
      console.log("usuarios: ", data);
      this.usuarios = data;
    });
  }*/

  registrarTarea() {
    
    this.submitted = true;
    this.loading = true;

    this.form.patchValue({
      fecha_inicio: this.datePipe.transform(this.form.value.fecha_inicio, 'yyyy-MM-dd'),
      fecha_final: this.datePipe.transform(this.form.value.fecha_final, 'yyyy-MM-dd')
    });

    if (this.data.estado === true) {
      this.tareaService
        .update(this.data?.id, this.form.value)
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
              title: 'Tarea editado con éxito',
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
      this.tareaService
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
              title: 'Tarea creado con éxito',
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
