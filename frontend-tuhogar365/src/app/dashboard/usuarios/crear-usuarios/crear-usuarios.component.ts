import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@core/service/user.service';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.scss'
})
export class CrearUsuariosComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  roles: any;
  submitted = false;
  loading = false;
  imagen: any;
  area_trabajos = [
    { area: 'Gestion' },
    { area: 'Direccion' },
    { area: 'Operaciones' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CrearUsuariosComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) {
    this.createForm();
  }
  close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.listaRoles();
    if (this.data.estado===true) {
        this.getById();
    }
  }

  getById() {
    this.userService.getById(this.data.id).subscribe(data=>{
      console.log("User: ", data);
      this.form.patchValue({
        username: data.username,
        password: '',
        email: data.email,
        nombres: data.nombres,
        apellidos: data.apellidos,
        ci: data.ci,
        celular: data.celular,
        rol_id: data.rol_id,
        area_trabajo: data?.area_trabajo,
        foto: data?.foto
      })

    })
  }

  listaRoles() {
    this.userService.getAllRoles().subscribe(data=>{
      this.roles = data;
    })
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      email: ['', [Validators.email]],
      nombres: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      apellidos: ['',[Validators.required, Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]
      ],
      ci: ['',Validators.required],
      celular: ['',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('[0-9]*')
        ]
      ],
      area_trabajo: [''],
      foto: [''],
      rol_id: ['', Validators.required],
    })
  }

  agregarFoto(data: any) {
    this.form.get('foto').setValue(data.url);
    this.imagen = data.file;
    console.log(data)
  }

  registerUser() {
    this.submitted = true;
    this.loading = true;

    const formData = new FormData()
    formData.append("username", this.form.controls['username'].value);
    formData.append("password", this.form.controls['password'].value);
    formData.append("email", this.form.controls['email'].value);
    formData.append("nombres", this.form.controls['nombres'].value);
    formData.append("apellidos", this.form.controls['apellidos'].value);
    formData.append("ci", this.form.controls['ci'].value);
    formData.append("celular", this.form.controls['celular'].value);
    formData.append("area_trabajo", this.form.controls['area_trabajo'].value);
    formData.append("rol_id", this.form.controls['rol_id'].value);

    if (this.imagen) {
      console.log(this.imagen);
      formData.append('foto', this.imagen);
    } else {
      formData.append('foto', '');
    }

    if (this.data.estado === true) {
      formData.append("_method", "PUT");
      this.userService
        .updatePost(this.data.id, formData)
        .pipe(
          finalize(() => {
            this.form.markAsPristine();
            this.loading = false;
          })
        )
        .subscribe(
          data3 => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario Editado con exito',
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data3)
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un problema',
              text: error.error,
            });
            this.submitted = false;
            this.loading = false;
          }
        );
    } else {
      this.userService
      .create(formData)
      .pipe(
        finalize(() => {
          this.form.markAsPristine();
          this.loading = false;
        })
        ).subscribe(
          data => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Usuario creado con exito',
              text: data.succes,
              showConfirmButton: false,
              timer: 1500
            });
            this.dialogRef.close(data);
          },
          (error: any) => {
            Swal.fire({
              icon: 'error',
              title: 'Ocurrio un problema',
              text: error.error,
            });
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }



}
