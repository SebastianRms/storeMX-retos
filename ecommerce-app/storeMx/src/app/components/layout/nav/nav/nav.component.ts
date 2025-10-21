import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MenuItemComponent, routeItem } from '../../../side-bar/menu-item/menu-item/menu-item.component';
import { SideMenuComponent } from '../../../side-bar/side-menu/side-menu/side-menu.component';
import { AuthService, decodedToken } from '../../../../core/services/auth/auth.service';
import { NavBarComponent } from '../../../nav-bar/nav-bar/nav-bar.component';

@Component({
  selector: 'app-nav',
  imports: [ReactiveFormsModule, AsyncPipe, NavBarComponent, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  searchProductForm = new FormGroup({
    q: new FormControl('', {nonNullable: true}), 
    minPrice: new FormControl(1000, {nonNullable:true}),
    maxPrice: new FormControl(3000, {nonNullable:true})
  })

  searchConfig$ = this.searchProductForm.valueChanges.pipe(
    debounceTime(300),
    // distinctUntilKeyChanged('q'),
    distinctUntilChanged((prevValue,newValue)=>{
      return prevValue === newValue
    }),
    map((config)=>{
      const trimmedConfig ={
        ...config,
        q: config.q?.trim() || ''
      }
      localStorage.setItem('searchConfig', JSON.stringify(trimmedConfig))
      return trimmedConfig;
    })
  );

  products$ = this.searchConfig$.pipe(
    switchMap((searchConfigObservable)=>this.productService.searchProducts(searchConfigObservable))
  )


  constructor(private productService: ProductsService, private authService: AuthService){}
  ngOnInit(): void {
    this.searchConfig$.subscribe({next: data => console.log(data)});
    this.user = this.authService.decodedToken;
    console.log(this.user)
  }
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

  authRoutes:routeItem[]=[
    { title: 'mi perfil', route: '/user' },
    { title: 'mi carrito', route:'/user/cart'}
  ]

  notAuthRoutes: routeItem[]=[
    { title: 'iniciar sesion', route: '/login' },
    { title: 'registro', route:'/register'}
  ]
  user: decodedToken | null = null;


  
}
