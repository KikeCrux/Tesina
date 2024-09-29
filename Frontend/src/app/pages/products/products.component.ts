import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';
import { CartComponent } from '../../components/cart/cart.component';

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

  pinatas = [
    {
      image: '../../../assets/pinatas/pinata_1.jpg',
      name: 'Piñata 1',
      price: '$150.00'
    },
    {
      image: '../../../assets/pinatas/pinata_2.jpg',
      name: 'Piñata 2',
      price: '$130.00'
    },
    {
      image: '../../../assets/pinatas/pinata_3.jpg',
      name: 'Piñata 3',
      price: '$120.00'
    },
    {
      image: '../../../assets/pinatas/pinata_1.jpg',
      name: 'Piñata 4',
      price: '$250.00'
    },
    {
      image: '../../../assets/pinatas/pinata_2.jpg',
      name: 'Piñata 5',
      price: '$230.00'
    },
    {
      image: '../../../assets/pinatas/pinata_3.jpg',
      name: 'Piñata 6',
      price: '$220.00'
    }
  ];

  // Lista de productos agregados al carrito
  cartItems: any[] = [];

  // Función para agregar una piñata al carrito
  addToCart(pinata: any) {
    this.cartItems.push(pinata);
  }
}
