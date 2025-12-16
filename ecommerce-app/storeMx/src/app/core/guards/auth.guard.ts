import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service'; 

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService); 

  if (authService.token) { 
    return true;
  } else {
    toastService.error('Debes iniciar sesión para acceder a esta página.');
    
    router.navigate(['/login']);
    return false;
  }
};  