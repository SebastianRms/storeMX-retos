import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs'; 

@Directive({
  selector: '[appAdmin]',
  standalone: true,
})
export class AdminDirective implements OnInit, OnDestroy {


  private authSubscription!: Subscription; 

  constructor(
    private authService: AuthService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {

    this.authSubscription = this.authService.isLoggedIn$.subscribe(() => {
      this.checkAdminAccess();
    });
  }


  private checkAdminAccess(): void {
    const role = this.authService.decodedToken?.role ?? '';

    this.viewContainer.clear();

    if (role === 'admin') {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }


  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
