import { AdminDirective } from './admin.directive';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth/auth.service';
import { ViewContainerRef, TemplateRef } from '@angular/core';

// 1. Crear mocks (simulaciones) para las dependencias
class MockAuthService {
  isLoggedIn$ = { subscribe: () => ({ unsubscribe: () => {} }) };
  decodedToken = { role: 'admin' }; // Asumimos 'admin' para la prueba de creación
}
class MockViewContainerRef {}
class MockTemplateRef {}

describe('AdminDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // 2. Proporcionar las versiones mock
        AdminDirective,
        { provide: AuthService, useClass: MockAuthService },
        { provide: ViewContainerRef, useClass: MockViewContainerRef },
        { provide: TemplateRef, useClass: MockTemplateRef },
      ],
      // Importar la directiva si no es standalone
      // imports: [AdminDirective], // Si es standalone
    });
  });

  it('should create an instance', () => {
    // 3. Obtener la instancia de la directiva usando TestBed
    const directive = TestBed.inject(AdminDirective); 
    expect(directive).toBeTruthy();
  });

  // Puedes añadir más pruebas aquí, por ejemplo, para verificar si se muestra o no.
});