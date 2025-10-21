import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

export type decodedToken = {
  userId: string;
  displayName: string;
  role: 'admin' | 'customer' | 'guest';
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/api';
  private loggedIn = new BehaviorSubject<boolean>(!!this.token);
  isLoggedIn$ = this.loggedIn.asObservable();
  
  constructor(private httpClient: HttpClient, private router:Router) {}

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get decodedToken(): decodedToken | null {
    const token = this.token;
    return token ? jwtDecode<decodedToken>(token) : null;
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/register`, data);
  }
  
  login(data: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/auth/login`, data).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  checkEmailExist(email:string): Observable<boolean>{
    return this.httpClient.get<{exists:boolean}>(`${this.baseUrl}/auth/check-email`, {params:{email}}).pipe(
      map((res)=> res.exists)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    console.log('Sesión cerrada correctamente.');
  }
}
