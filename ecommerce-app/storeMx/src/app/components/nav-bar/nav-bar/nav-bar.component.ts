import { Component, inject, Input } from '@angular/core';
import { MenuItemComponent, routeItem } from '../../side-bar/menu-item/menu-item/menu-item.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Input() title?: string;
  @Input() navRoutes: routeItem[] = [];
  private authService = inject(AuthService);
  isLoggedIn$: Observable<boolean>;

  constructor() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout(): void {
    this.authService.logout();
}
}
