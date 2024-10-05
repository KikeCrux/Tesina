import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  @Input() cartItems: any[] = [];

  ngOnInit() {
    this.loadCartFromLocalStorage();
  }

  // Cargar el carrito desde localStorage
  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  // Guardar el carrito en localStorage
  saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Función para aumentar la cantidad
  increaseQuantity(index: number) {
    this.cartItems[index].quantity += 1;
    this.saveCartToLocalStorage();
  }

  // Función para disminuir la cantidad (sin bajar de 1)
  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
      this.saveCartToLocalStorage();
    }
  }

  // Calcular el subtotal
  getSubtotal() {
    return this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }

  // Eliminar un producto del carrito
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCartToLocalStorage();
  }
}
