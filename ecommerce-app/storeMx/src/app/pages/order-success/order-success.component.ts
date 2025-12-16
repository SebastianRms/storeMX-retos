import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [RouterModule],
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent {
  orderId: string | null = null;

  constructor(private route: ActivatedRoute) { } // Inyectar ActivatedRoute

  ngOnInit(): void {
    // Leer el ID que viene en la URL
    this.orderId = this.route.snapshot.paramMap.get('orderId');
  }
}
