import { Component } from '@angular/core';
import { Observable, of, scan } from 'rxjs';
import { ToastMessage } from '../../../../core/types/ToastMessage';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  toasts$: Observable<ToastMessage[]> = of([]);
  toastHistory$: Observable<ToastMessage[]> = of([]);
  showHistory = false; 

  constructor(private toast: ToastService) {}
  ngOnInit(): void {
    this.toasts$ = this.toast.toast$;
    
    this.toastHistory$ = this.toast.toastHistory$.pipe(
      scan((acc: ToastMessage[], current: ToastMessage) => {
        const updated = [...acc, current];
        return updated.slice(-10);
      }, [])
    );
  }

  toggleHistory() {
    this.showHistory = !this.showHistory;
  }
}
