import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-paquete',
  standalone: true,
  imports: [],
  templateUrl: './card-paquete.component.html',
  styleUrl: './card-paquete.component.css'
})
export class CardPaqueteComponent {
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() precio!: number;
  @Input() decoracion!: string;
}
