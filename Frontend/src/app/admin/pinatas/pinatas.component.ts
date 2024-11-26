import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPinataComponent } from "../../components/card-pinata/card-pinata.component";

@Component({
  selector: 'app-pinatas',
  standalone: true,
  imports: [CommonModule,CardPinataComponent],
  templateUrl: './pinatas.component.html',
  styleUrl: './pinatas.component.css'
})
export class PinatasComponent {
  paquetes = [
    {
      nombre: 'Paquete Básico',
      descripcion: 'Incluye una piñata y decoraciones básicas.',
      precio: 500,
    },
    {
      nombre: 'Paquete Básico',
      descripcion: 'Incluye una piñata y decoraciones básicas.',
      precio: 500,
    },
    {
      nombre: 'Paquete Básico',
      descripcion: 'Incluye una piñata y decoraciones básicas.',
      precio: 500,
    }
  ];
}
