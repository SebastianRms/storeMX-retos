// src/app/pages/auth/register/register-form.component.ts

import { Component, inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { catchError, debounceTime, of, switchMap } from 'rxjs';
import { FormFieldComponent } from '../../shared/form-field/form-field/form-field.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. IMPORTAR ROUTER

@Component({
  selector: 'app-register-form',
  standalone: true, // Asegúrate que sea standalone si usas imports
  imports: [ReactiveFormsModule, FormFieldComponent, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  imagePreview: string = '';

  fb = inject(FormBuilder);
  registerForm: FormGroup;

  fields = [
    { label: 'Nombre de usuario', fieldId: 'displayName', type: 'text', placeholder: '', required: true },
    { label: 'fecha de nacimiento', fieldId: 'dateOfBirth', type: 'date', placeholder: 'DD/MM/YYYY', required: true },
    { label: 'email', fieldId: 'email', type: 'email', placeholder: 'example@example.com', required: true },
    { label: 'telefono', fieldId: 'phone', type: 'text', placeholder: '1234567890', required: true },
    { label: 'contraseña', fieldId: 'password', type: 'password', placeholder: '*******', required: true },
    { label: ' repetir contraseña', fieldId: 'repeatPassword', type: 'password', placeholder: '*******', required: true },
  ];

  constructor(
    private authService: AuthService,
    private router: Router // 2. INYECTAR ROUTER
  ) {
    this.registerForm = this.fb.group(
      {
        displayName: ['', [Validators.required]],
        email: [
          '',
          [Validators.email, Validators.required],
          [this.emailAsycValidator()],
        ],
        phone: [
          '',
          [Validators.required, this.phoneValidator()],
        ],
        dateOfBirth: ['', [Validators.required]],
        avatar: [''],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: this.matchPasswordValidator('password', 'repeatPassword'),
      }
    );
  }

  onImageSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files.length > 0 ? target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  matchPasswordValidator(passwordField: string, repeatPasswordField: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = (formGroup as FormGroup).get(passwordField)?.value;
      const repeatPassword = (formGroup as FormGroup).get(repeatPasswordField)?.value;
      return password === repeatPassword ? null : { doesnt_match: true };
    };
  }

  phoneValidator(): ValidatorFn {
    return (formControl: AbstractControl): ValidationErrors | null => {
      const phoneValue = formControl.value;
      if (!phoneValue) return null; // Si está vacío, lo maneja el required
      if (phoneValue.length !== 10 || Number.isNaN(+phoneValue)) {
        return { invalid_phone: true };
      }
      return null;
    };
  }

  emailAsycValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }
      return this.authService.checkEmailExist(control.value).pipe(
        debounceTime(500), // Reduje el tiempo a 500ms para que sea más ágil
        switchMap((exist) => (exist ? of({ emailTaken: true }) : of(null))),
        catchError(() => of({ cantFetch: true }))
      );
    };
  }

  getErrorMessage(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (!control || !control.touched) return '';
    
    if (control.hasError('required')) return 'Este campo es requerido';
    if (control.hasError('email')) return 'Email no válido';
    if (control.hasError('emailTaken')) return 'Este usuario ya existe';
    if (control.hasError('cantFetch')) return 'Error del servidor';
    if (control.hasError('invalid_phone')) return 'Teléfono no válido (10 dígitos)';
    if ((controlName === 'password' || controlName === 'repeatPassword') && this.registerForm.hasError('doesnt_match')) {
      return 'Las contraseñas deben ser iguales';
    }
    return '';
  }

  // 🛑 LÓGICA CORREGIDA 🛑
  handleSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // Marca errores si intentan enviar vacío
      return;
    }

    console.log('Enviando formulario...', this.registerForm.value);

    // AQUÍ ESTÁ LA MAGIA: .subscribe()
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        alert('¡Cuenta creada con éxito! Bienvenido.');
        this.router.navigate(['/login']); // Redirige al Login
      },
      error: (error) => {
        console.error('Error en registro:', error);
        alert('Hubo un problema al crear la cuenta. Intenta de nuevo.');
      }
    });
  }
}