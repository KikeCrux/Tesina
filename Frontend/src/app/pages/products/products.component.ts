import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardsComponent } from '../../components/cards/cards.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,
    CardsComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  pinatas = [
    {
      image: '../../../assets/pinatas/pinata_1.jpg',
      price: '$150.00'
    },
    {
      image: '../../../assets/pinatas/pinata_2.jpg',
      price: '$130.00'
    },
    {
      image: '../../../assets/pinatas/pinata_3.jpg',
      price: '$120.00'
    },
    {
      image: '../../../assets/pinatas/pinata_1.jpg',
      price: '$250.00'
    },
    {
      image: '../../../assets/pinatas/pinata_2.jpg',
      price: '$230.00'
    },
    {
      image: '../../../assets/pinatas/pinata_3.jpg',
      price: '$220.00'
    }
  ];
}
