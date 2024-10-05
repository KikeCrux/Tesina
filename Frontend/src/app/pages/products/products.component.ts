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
  isAuthenticated: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Verificar si el usuario ha iniciado sesión
    this.currentUser = this.authService.getCurrentUser();
    this.isAuthenticated = !!this.currentUser;
    this.tipoUsuario = this.currentUser?.tipo_usuario || 'menudeo';

    // Cargar los productos del catálogo
    this.productService.getProductos(this.tipoUsuario, this.currentUser?.id_usuario).subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );

    // Si el usuario está autenticado, cargar el carrito desde localStorage
    if (this.isAuthenticated) {
      this.loadCartFromLocalStorage();
    }
  }

  // Método para agregar productos al carrito
  addToCart(producto: any) {
    if (this.isAuthenticated) {
      const existingItem = this.cartItems.find(item => item.name === producto.nombre);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const cartItem = {
          image: producto.imagen_url ? '../../../assets/pinatas/' + producto.imagen_url : '../../../assets/404-page.png',
          name: producto.nombre,
          price: this.tipoUsuario === 'mayoreo' ? producto.precio_mayoreo : producto.precio,
          quantity: 1
        };
        this.cartItems.push(cartItem);
      }

      // Guardar el carrito actualizado en localStorage
      this.saveCartToLocalStorage();
    }
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
