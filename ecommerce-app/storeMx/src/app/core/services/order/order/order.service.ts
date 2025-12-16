import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders'; // Endpoint base de tus órdenes

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las órdenes del usuario logueado.
   * El Back-end debe usar el token JWT para saber quién es el usuario.
   * @param userId (Opcional, pero se recomienda que el Back-end lo tome del token)
   */
  getOrdersByUserId(): Observable<any[]> {
    // 🛑 Endpoint asumido: Tu Back-end DEBE tener un endpoint como este 🛑
    // La lógica de saber qué ID buscar la maneja tu Back-end leyendo el JWT.
    return this.http.get<any[]>(`${this.apiUrl}/user`).pipe(
      catchError((error) => {
        console.error('Error al cargar historial de órdenes:', error);
        // Aquí iría tu ToastService para notificar al usuario (Paso A2)
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }
}
