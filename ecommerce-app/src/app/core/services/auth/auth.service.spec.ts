import 'jasmine'
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// ✅ Interfaz para tipar la respuesta del backend
interface LoginResponse {
  token: string;
  name: string;
  role: string;
}

// Mock del Router para evitar errores de navegación
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let loginUrl: string;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter }
      ]
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as unknown as MockRouter;
    loginUrl = 'http://localhost:3000/api/auth/login';
    localStorage.clear();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // 🧪 Prueba 1: Inicialización
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // 🧪 Prueba 2: Inicio de sesión exitoso
  it('should save token and update loggedIn status on successful login', () => {
    const mockToken = 'fake-jwt-token-123';
    const mockResponse: LoginResponse = { token: mockToken, name: 'Sebastian', role: 'admin' };
    const credentials = { email: 'test@example.com', password: 'password' };

    let isLogged = false;
    service.isLoggedIn$.subscribe((isLoggedIn) => (isLogged = isLoggedIn));

    service.login(credentials).subscribe((response: LoginResponse) => {
      expect(response.token).toEqual(mockToken); // ✅ ya no usamos "as any"
    });

    const req = httpTestingController.expectOne(loginUrl);
    expect(req.request.method).toEqual('POST');

    req.flush(mockResponse);

    expect(localStorage.getItem('token')).toEqual(mockToken);
    expect(isLogged).toBeTrue();
  });

  // 🧪 Prueba 3: Cierre de sesión
  it('should clear token, update loggedIn status to false, and navigate to login on logout', () => {
    localStorage.setItem('token', 'active-token-xyz');

    let isLogged = true;
    service.isLoggedIn$.subscribe((isLoggedIn) => (isLogged = isLoggedIn));

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(isLogged).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  // 🧪 Prueba 4: Manejo de error en login
  it('should not save token and loggedIn status should remain false on login failure (400)', (done) => {
    const credentials = { email: 'wrong@example.com', password: 'wrong' };
    let loggedInStatus = false;

    service.isLoggedIn$.subscribe((isLoggedIn) => {
      loggedInStatus = isLoggedIn;
    });

    service.login(credentials).subscribe({
      next: () => fail('Login should have failed with 400'),
      error: (error: any) => {
        expect(error.status).toEqual(400);
        expect(localStorage.getItem('token')).toBeNull();
        expect(loggedInStatus).toBeFalse();
        done();
      },
    });

    const req = httpTestingController.expectOne(loginUrl);
    req.flush('Credenciales Inválidas', { status: 400, statusText: 'Bad Request' });
  });
});