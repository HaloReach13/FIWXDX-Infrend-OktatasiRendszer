import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from '../../../../models';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth';
import { AdministratorService } from '../../services/administrator-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  formBuilder = inject(FormBuilder);
  administratorService = inject(AdministratorService);
  authService = inject(AuthService);
  router = inject(Router);
  toastrService = inject(ToastrService);
  
  loginForm = this.formBuilder.group({
    email: this.formBuilder.control(''),
    password: this.formBuilder.control('')
  });

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.administratorService.login(loginData).subscribe({
      next: (response: any) => {
        this.authService.setToken(response.accessToken);
        this.router.navigateByUrl('');
      },
      error: (err) => {
        this.toastrService.error(err.error.error, 'Error');
      }
    });
  }
}
