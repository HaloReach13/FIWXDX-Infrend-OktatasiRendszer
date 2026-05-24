import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministratorService } from '../../services/administrator-service';
import { ToastrService } from 'ngx-toastr';
import { AdministratorDTO } from '../../../../models';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  formBuilder = inject(FormBuilder);
  administratorService = inject(AdministratorService);
  router = inject(Router);
  toastrService = inject(ToastrService);

  registerForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastrService.error('Please fill in all fields correctly.', 'Error');
      return;
    }

    const registerData = this.registerForm.value as AdministratorDTO;

    this.administratorService.register(registerData).subscribe({
      next: () => {
        this.toastrService.success('Successful administrator registration!', 'Success');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        const errorMsg = err.error?.error || 'Registration failed.';
        this.toastrService.error(errorMsg, 'Error');
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }
}
