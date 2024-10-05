import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { CartComponent } from '../../components/cart/cart.component';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardsComponent,
    CartComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productos: Producto[] = [];
  cartItems: any[] = [];
  tipoUsuario: string = '';
  currentUser: any = null;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.tipoUsuario = this.currentUser?.tipo_usuario || 'menudeo';

    this.loadCartFromLocalStorage();

    this.productService.getProductos(this.tipoUsuario, this.currentUser?.id_usuario).subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  addToCart(producto: any) {
    this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    const existingItem = this.cartItems.find(item => item.name === producto.nombre);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const cartItem = {
        image: producto.imagen_url ? '../../../assets/pinatas/' + producto.imagen_url : '../../../assets/404-page.png',
        name: producto.nombre,
        price: producto.precio,
        quantity: 1
      };
      this.cartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Guardar el carrito en localStorage
  saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Cargar el carrito desde localStorage
  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }
}
