import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], // Agregar CommonModule para directivas como *ngIf y *ngFor
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Cambiar a styleUrls
})
export class CartComponent implements OnInit {
  @Input() cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  getSubtotal() {
    return this.cartService.getSubtotal();
  }
}
