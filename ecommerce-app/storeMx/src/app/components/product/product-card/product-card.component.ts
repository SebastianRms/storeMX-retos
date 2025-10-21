import { Component, Input } from '@angular/core';
import { Product } from '../../../core/types/Products';
import { CartService } from '../../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OfferDirective } from '../../../core/directives/offer/offer.directive';
import { AdminDirective } from '../../../core/directives/admin/admin.directive';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CommonModule, OfferDirective, AdminDirective],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!:Product;
  constructor(private cartService: CartService){}
  loading: boolean= false;

  addToCart(){
    this.loading = true
    console.log(this.loading);
    this.cartService.addToCart(this.product._id).subscribe({
      next:()=> this.loading = false,
      error:()=> this.loading = false,
    });
  }

  
}
