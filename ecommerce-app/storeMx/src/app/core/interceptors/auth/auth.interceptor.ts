import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) {
    return next(req);
  }

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(newReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.error('Token expirado o inválido. Cerrando sesión...');
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};
