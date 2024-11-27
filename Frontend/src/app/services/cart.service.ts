import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSource = new BehaviorSubject<any[]>(this.loadCartFromLocalStorage());
  cartItems$ = this.cartItemsSource.asObservable();

  // Cargar el carrito desde localStorage
  private loadCartFromLocalStorage(): any[] {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Guardar el carrito en localStorage
  private saveCartToLocalStorage(cartItems: any[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  // Obtener los elementos actuales del carrito
  getCartItems(): any[] {
    return this.cartItemsSource.value;
  }

  // Actualizar el carrito y notificar a los observadores
  setCartItems(cartItems: any[]) {
    this.cartItemsSource.next(cartItems);
    this.saveCartToLocalStorage(cartItems);
  }

  // Agregar un producto al carrito
  addToCart(item: any) {
    const cartItems = this.getCartItems();
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    this.setCartItems(cartItems);
  }

  // Eliminar un producto del carrito
  removeItem(index: number) {
    const cartItems = this.getCartItems();
    cartItems.splice(index, 1);
    this.setCartItems(cartItems);
  }

  // Incrementar la cantidad de un producto
  increaseQuantity(index: number) {
    const cartItems = this.getCartItems();
    cartItems[index].quantity += 1;
    this.setCartItems(cartItems);
  }

  // Disminuir la cantidad de un producto
  decreaseQuantity(index: number) {
    const cartItems = this.getCartItems();
    if (cartItems[index].quantity > 1) {
      cartItems[index].quantity -= 1;
      this.setCartItems(cartItems);
    }
  }

  // Calcular el subtotal
  getSubtotal() {
    const cartItems = this.getCartItems();
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
