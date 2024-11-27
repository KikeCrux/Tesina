import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { CartComponent } from '../../components/cart/cart.component';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardsComponent,
    CartComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productos: Producto[] = [];
  cartItems: any[] = [];
  tipoUsuario: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isUserLoggedIn();

    if (this.isAuthenticated) {
      const currentUser = this.authService.decodeToken();
      this.tipoUsuario = currentUser?.tipo_usuario || 'menudeo';

      // Subscribirse al carrito
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
      });
    } else {
      this.tipoUsuario = 'menudeo';
    }

    // Cargar los productos del catálogo
    this.productService.getProductos(this.tipoUsuario).subscribe(
      (data: Producto[]) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  addToCart(producto: Producto) {
    const cartItem = {
      image: producto.imagen_url ? '../../../assets/pinatas/' + producto.imagen_url : '../../../assets/404-page.png',
      name: producto.nombre,
      price: this.tipoUsuario === 'mayoreo' ? producto.precio_mayoreo : producto.precio
    };

    this.cartService.addToCart(cartItem);
  }
}
