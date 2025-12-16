import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { OrderService } from '../../../core/services/order/order/order.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserFormsComponent } from '../user-forms/user-forms/user-forms.component';
import { UserService } from '../../../core/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UserFormsComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  // Observables para los datos (inicialización segura)
  activeTab: 'orders' | 'forms' | 'update' = 'forms';
  userCart$: Observable<any> = of(null); 
  userInfo: any = {};
  userOrders$: Observable<any[]> = of([]); 

  // 🛑 PROPIEDADES PARA EL FORMULARIO Y SKELETONS 🛑
  profileForm!: FormGroup; // El formulario reactivo para editar el perfil
  ordersLoading = true;    // Indicador de carga para el Skeleton de Órdenes

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService,
    private userService: UserService
  ) {
    // Inicializamos userCart$ de forma segura en el constructor
    this.userCart$ = this.cartService.cart$;
  }

 ngOnInit(): void {
    // 🛑 FIX: Agregamos ': any' para que TypeScript nos deje leer las propiedades
    const tokenData: any = this.authService.decodedToken || {};
    
    // TRADUCCIÓN DE DATOS
    this.userInfo = {
        // Ahora sí nos dejará leer displayName sin error
        name: tokenData.displayName || tokenData.name || 'Usuario',
        email: tokenData.email || 'Correo no disponible',
        // Obtenemos el ID (priorizando userId que es lo que vimos en tu consola)
        userId: tokenData.userId || tokenData._id || tokenData.id
    };

    console.log('✅ Datos procesados para el HTML:', this.userInfo);

    // 2. Cargar las órdenes (Historial)
    if (this.userInfo.userId) {
        this.orderService.getOrdersByUserId().subscribe({
            next: (orders) => {
                this.userOrders$ = of(orders);
                this.ordersLoading = false;
            },
            error: (err) => {
                this.ordersLoading = false;
                console.error('❌ Error al cargar órdenes (Backend 500):', err);
            }
        });
    } else {
        this.ordersLoading = false;
    }

    this.cartService.loadCart(); 
  }

 setActiveTab(tab: 'orders' | 'forms'): void {
    this.activeTab = tab;
  }
  
  // Lógica de Cerrar Sesión
  logout(): void {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        this.authService.logout();
        // Asumo que el logout te redirige, o usas Router aquí.
        // Si no lo tienes inyectado: constructor(..., private router: Router)
        // this.router.navigate(['/login']);
    }
  }

  // 🛑 Lógica para actualizar perfil (USANDO LA API) 🛑
  // Asumimos que tienes un endpoint para esto, probablemente en el AuthService o UserService.
  onUpdateProfile() {
    if (this.profileForm.valid) {
        // Aquí debes llamar a un servicio real para enviar la data
        console.log('Enviando datos de perfil:', this.profileForm.value);
        alert('Actualización simulada. Debes implementar la llamada a la API.'); 
        
        /* EJEMPLO DE CÓDIGO REAL: 
        this.userService.updateProfile(this.profileForm.value).subscribe({
            next: (res) => alert('Perfil actualizado con éxito'),
            error: (err) => console.error('Error al actualizar', err)
        });
        */
    }
  }


}
