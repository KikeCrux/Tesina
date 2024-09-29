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
  @Input() price: number = 0;
  @Input() name: string = '';

  // Emitir un evento cuando se haga clic en "Agregar al carrito"
  @Output() productAdded = new EventEmitter<void>();

  //Aqui va una imagen default en caso de no encontrarlo
  onImageError(event: any) {
    event.target.src = '../../../assets/pinatas/pinata_mario_bros.jpg';
  }

  addToCart() {
    this.productAdded.emit();
  }

}
