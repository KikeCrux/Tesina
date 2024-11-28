import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CardComponenteComponent } from '../../components/card-componente/card-componente.component';

declare var bootstrap: any; // Declarar bootstrap para evitar errores de tipado

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [CommonModule, CardComponenteComponent, FormsModule],
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css'], // Corregido: styleUrls en plural
})
export class ComponentesComponent {
  componentes = [
    {
      nombre: 'Piñata Frozen',
      precio: 120,
      tipo: 'Piñata',
      cantidad: 2,
    },
    {
      nombre: 'Piñata Cars',
      precio: 150,
      tipo: 'Piñata',
      cantidad: 3,
    },
    {
      nombre: 'Decoración Fiesta',
      precio: 300,
      tipo: 'Decoración',
      cantidad: 1,
    },
  ];

  // Inicializar un objeto para el nuevo componente
  nuevoComponente = {
    nombre: '',
    precio: 0,
    tipo: '',
    cantidad: 0,
  };

  // Método para manejar el formulario
  onSubmit() {
    if (
      this.nuevoComponente.nombre &&
      this.nuevoComponente.tipo &&
      this.nuevoComponente.cantidad > 0 &&
      this.nuevoComponente.precio > 0
    ) {
      // Agregar el nuevo componente a la lista
      this.componentes.push({
        nombre: this.nuevoComponente.nombre,
        tipo: this.nuevoComponente.tipo,
        cantidad: this.nuevoComponente.cantidad,
        precio: this.nuevoComponente.precio,
      });

      // Resetear el formulario
      this.nuevoComponente = { nombre: '', tipo: '', cantidad: 0, precio: 0 };

      // Cerrar el modal utilizando Bootstrap
      const modalElement = document.getElementById('addPackageModal') as HTMLElement;
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance?.hide(); // Cierra el modal si existe
    }
  }
}
