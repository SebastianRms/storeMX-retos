import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import {
  MenuItemComponent,
  routeItem,
} from '../../menu-item/menu-item/menu-item.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [CommonModule, MenuItemComponent, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css',
})
export class SideMenuComponent {
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

  get displayName(): string | null {
    return this.authService.decodedToken?.displayName ?? null;
  }
}
