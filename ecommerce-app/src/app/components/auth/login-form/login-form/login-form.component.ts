  import { Component, inject } from '@angular/core';
  import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  import { Router, RouterLink } from '@angular/router';
  import { AuthService } from '../../../../core/services/auth/auth.service';
  import { FormErrorService } from '../../../../core/services/form-error/form-error.service';
  import { FormFieldComponent } from '../../../shared/form-field/form-field/form-field.component';
  import { ToastService } from '../../../../core/services/toast/toast.service';

  @Component({
    selector: 'app-login-form',
    imports: [FormFieldComponent, ReactiveFormsModule, RouterLink],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css',
  })
  export class LoginFormComponent {
    fb = inject(FormBuilder);
    loginForm: FormGroup;
    private toastService = inject(ToastService);

    constructor(
      private validation: FormErrorService,
      private authService: AuthService,
      private router: Router
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }
    getErrorMessage(fieldName: string) {
      const loginLabels = {
        email: 'email',
        password: 'contraseña',
      };
      return this.validation.getFieldError(
        this.loginForm,
        fieldName,
        loginLabels
      );
    }

    handleSubmit() {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        this.toastService.error(
          'Por favor, completa todos los campos obligatorios.'
        );
        return;
      }
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login exitoso!');
          this.toastService.success(
            '¡Bienvenido! Sesión iniciada correctamente.'
          );
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error en el login:', err);
          const specificError =
            err.error?.message || 'Error de servidor. Inténtalo más tarde.';
          this.toastService.error(specificError);
        },
      });
    }
  }
