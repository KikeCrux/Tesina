import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardPaqueteComponent } from '../../components/card-paquete/card-paquete.component';

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, RouterModule, CardPaqueteComponent],
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})
export class PaquetesComponent {
  paquetes = [
    {
      nombre: 'Paquete Básico',
      descripcion: 'Incluye una piñata y decoraciones básicas.',
      precio: 500,
      decoracion: 'Globos de colores'
    },
    {
      nombre: 'Paquete Premium',
      descripcion: 'Incluye piñata, decoración temática y dulces.',
      precio: 1200,
      decoracion: 'Temática personalizada'
    },
    {
      nombre: 'Paquete Deluxe',
      descripcion: 'Incluye piñata, decoración temática, dulces y bocadillos.',
      precio: 2000,
      decoracion: 'Temática premium'
    }
  ];
}
