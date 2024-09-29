import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() image: string = '';
  @Input() price: string = '';
  @Input() name: string = '';

  // Emitir un evento cuando se haga clic en "Agregar al carrito"
  @Output() productAdded = new EventEmitter<void>();

  addToCart() {
    this.productAdded.emit();
  }

}
