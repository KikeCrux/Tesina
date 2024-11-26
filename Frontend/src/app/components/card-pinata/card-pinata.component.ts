import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-pinata',
  standalone: true,
  imports: [],
  templateUrl: './card-pinata.component.html',
  styleUrl: './card-pinata.component.css'
})
export class CardPinataComponent {
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() precio!: number;
  @Input() decoracion!: string;
}
