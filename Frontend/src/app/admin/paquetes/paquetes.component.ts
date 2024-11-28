import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CardPaqueteComponent } from '../../components/card-paquete/card-paquete.component';

declare var bootstrap: any; // Declarar bootstrap para evitar errores de tipado
@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, RouterModule, CardPaqueteComponent, FormsModule],
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
// Inicializar un objeto para el nuevo componente
nuevoPaquete = {
  nombre: '',
  descripcion: '',
  precio: 0,
  decoracion: '',
};

// Método para manejar el formulario
onSubmit() {
  if (
    this.nuevoPaquete.nombre &&
    this.nuevoPaquete.descripcion &&
    this.nuevoPaquete.precio > 0 &&
    this.nuevoPaquete.decoracion
  ) {
    // Agregar el nuevo componente a la lista
    this.paquetes.push({
      nombre: this.nuevoPaquete.nombre,
      descripcion: this.nuevoPaquete.descripcion,
      precio: this.nuevoPaquete.precio,
      decoracion : this.nuevoPaquete.decoracion
    });

    // Resetear el formulario
    this.nuevoPaquete = { nombre: '', descripcion: '', precio: 0, decoracion: ''};

    // Cerrar el modal utilizando Bootstrap
    const modalElement = document.getElementById('addPackageModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide(); // Cierra el modal si existe
  }
}
}

