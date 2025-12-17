import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
// 👇 1. IMPORTANTE: Importar el environment (ajusta la ruta si te marca error en rojo)
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // 👇 2. CAMBIO CLAVE: Usamos la variable del environment + '/orders'
  // Esto hará que en tu casa use localhost y en la nube use Render automáticamente.
  private apiUrl = `${environment.apiUrl}/orders`; 

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las órdenes del usuario logueado.
   * El Back-end debe usar el token JWT para saber quién es el usuario.
   * @param userId (Opcional, pero se recomienda que el Back-end lo tome del token)
   */
  getOrdersByUserId(): Observable<any[]> {
    // La lógica de saber qué ID buscar la maneja tu Back-end leyendo el JWT.
    // Nota: Como apiUrl ya incluye '/orders', aquí solo agregamos '/user'
    return this.http.get<any[]>(`${this.apiUrl}/user`).pipe(
      catchError((error) => {
        console.error('Error al cargar historial de órdenes:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }
}