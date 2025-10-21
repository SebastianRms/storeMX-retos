import { Component, inject } from '@angular/core';
import { AuthService, decodedToken } from '../../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { routeItem } from '../../../side-bar/menu-item/menu-item/menu-item.component';
import { SideMenuComponent } from '../../../side-bar/side-menu/side-menu/side-menu.component';

@Component({
  selector: 'app-aside',
  imports: [CommonModule, SideMenuComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  sideBarOpen: boolean = false;
  private authService = inject(AuthService);

  routes: routeItem[] = [
    { title: 'Inicio', route: '', textColor:'text-green-200'},
    { title: 'Productos', route: '/products' },
    { title: 'Categorias', route:'/categories'}
  ];
  
  adminRoutes: routeItem[]=[
    { title: 'Productos', route: '/admin/products' },
    { title: 'Usuarios', route: '/admin/users' },
    { title: 'Categorias', route: '/admin/categories' },
    { title: 'Compras', route: '/admin/purchases' },
  ]


  constructor(){
    
  }

  get isAdmin(): boolean {
    return this.authService.decodedToken?.role === 'admin';
  }
}
