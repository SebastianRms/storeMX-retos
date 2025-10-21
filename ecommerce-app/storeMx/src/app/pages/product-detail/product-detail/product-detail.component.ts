import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/types/Products';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
  standalone: true,
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        const id = params.get('id');
        if (!id) {
          return;
        }
        this.productService.getProductByID(id).subscribe({
          next: (product) => {
            this.product = product;
            console.log(product);
          },
          error: (error) => {
            this.product = null;
          },
        });
      },
    });
  }

  handleAddToCart(): void {
    if (!this.product) {
      console.error('Error al añadir producto al carrito');
      return;
    }
    
    this.cartService.addToCart(this.product._id, 1).subscribe({
      next: (response) => {
        console.log(`¡"${this.product?.name}" se añadió al carrito!`, response);
      },
      error: (err) => {
        console.error('Error al añadir el producto al carrito:', err);
        alert('Ocurrió un error al añadir el producto. Por favor, intenta de nuevo.');
      }
    });
  }

}
