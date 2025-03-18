import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { TokenStorageService } from '@core/authentication/token-storage.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  credentials: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.authenticationService
        .login(this.authForm.value)
        .pipe(
          finalize(() => {
            this.authForm.markAsPristine();
          })
        )
        .subscribe(
          (res:any) => {
            if (res) {
              if (res) {
                this.credentials = res.data;
                this.tokenStorage.saveToken(this.credentials.token);
                this.tokenStorage.saveUser(this.credentials.user);
                
                if (this.credentials.token) {
                  Swal.fire({
                    position: 'top-right',
                    icon: 'success',
                    title: 'Bienvenido al sistema',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.router.navigate(['/dashboard/calendario-plazos']);
                }
              } else {
                this.error = 'Invalid Login';
              }
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error:any) => {
            console.log(error);
            
            this.error = error.error;
            Swal.fire({
              position: 'top-right',
              icon: 'error',
              title: error.error,
              showConfirmButton: false,
              timer: 1500
            });
            this.submitted = false;
            this.loading = false;
          },
        );
    }
  }
}
