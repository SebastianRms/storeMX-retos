import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastService } from '../services/toast/toast.service';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 404 && req.url.includes('/cart/user/')) {
         return throwError(() => error);
      }

      let errorMessage = 'Error al procesar la solicitud.';
      switch (error.status) {
        case 0:
          errorMessage =
            'Imposible conectar con el servidor. Verifica tu conexión o el estado del Back-end.';
          break;
        case 400:
          errorMessage =
            error.error?.message || 'Datos de la solicitud inválidos.';
          break;
        case 401:
        case 403:
          errorMessage =
            'Sesión expirada o no autorizado. Iniciando cierre de sesión.';
          authService.logout();
          break;
        case 404:
          errorMessage = 'Recurso no encontrado (URL inválida).';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Inténtelo más tarde.';
          break;
        default:
          errorMessage = `Error del Servidor [${error.status}]: ${error.statusText}`;
      }
      toastService.error(errorMessage, 6000);
      return throwError(() => error);
    })
  );
};
