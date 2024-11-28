import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-componente',
  standalone: true,
  imports: [],
  templateUrl: './card-componente.component.html',
  styleUrl: './card-componente.component.css'
})
export class CardComponenteComponent {
  @Input() nombre!: string;
  @Input() tipo!: string;
  @Input() precio!: number;
  @Input() cantidad!: number;
}
