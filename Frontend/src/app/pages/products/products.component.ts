import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { CartComponent } from '../../components/cart/cart.component';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/producto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,
    CardsComponent,
    CartComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  productos: Producto[] = [];
  cartItems: any[] = [];
  tipoUsuario: string = '';
  currentUser: any = null;

  constructor(private productService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.tipoUsuario = this.currentUser?.tipo_usuario || 'menudeo';  // Si no hay usuario, se asume menudeo

    // Llamar al servicio de productos para obtener los productos según el tipo de usuario
    this.productService.getProductos(this.tipoUsuario, this.currentUser?.id_usuario).subscribe(
      (data: Producto[]) => {
        this.productos = data;
        console.log('Productos obtenidos:', this.productos);
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  addToCart(producto: any) {
    this.cartItems.push(producto);
  }
}
