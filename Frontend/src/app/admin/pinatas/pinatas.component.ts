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
      nombre: 'Piñata básica',
      descripcion: 'Incluye una piñata básica.',
      precio: 500,
    },
    {
      nombre: 'Piñata básica',
      descripcion: 'Incluye una piñata básica.',
      precio: 500,
    },
    {
      nombre: 'Piñata básica',
      descripcion: 'Incluye una piñata básica.',
      precio: 500,
    }
  ];
}
