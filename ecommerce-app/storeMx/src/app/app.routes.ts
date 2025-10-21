import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home', pathMatch: 'full' },

  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products/products.component').then(
        (c) => c.ProductsComponent
      ),
    title: 'products',
  },
  {
    path:'product-view/:id', 
    loadComponent: () => import('./pages/product-detail/product-detail/product-detail.component').then(
      (c)=> c.ProductDetailComponent
    ),
    title:'product details'
  },
  {
    path: 'register', loadComponent:()=> import('./pages/register/register/register.component').then(c=>c.RegisterComponent),
    title: 'registro'
  },
  {
    path: 'login', loadComponent: ()=> import('./pages/login/login/login.component').then(c=>c.LoginComponent),
    title: 'login'
  },
  {
    path: 'user/cart', loadComponent: () => import('./pages/cart/cart/cart.component').then(c=>c.CartComponent),
    title: 'Carrito'
  }
];
