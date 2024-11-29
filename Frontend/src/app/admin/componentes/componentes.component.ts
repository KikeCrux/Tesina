import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentService } from '../../services/component.service'; // Servicio de componentes
import { PackageService } from '../../services/package.service'; // Servicio de paquetes
import { Componente } from '../../models/componentes'; // Modelo de componentes
import { Package } from '../../models/package'; // Modelo de paquetes

@Component({
  selector: 'app-componentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css'],
})
export class ComponentesComponent implements OnInit {
  componentes: Componente[] = []; // Lista de componentes cargados
  paquetes: Package[] = []; // Lista de paquetes disponibles
  paqueteSeleccionado: number | null = null; // Paquete seleccionado
  nuevoComponente: Componente = {
    id_paquete: 1, // Inicializa con un paquete por defecto
    nombre_componente: '',
    tipo_componente: 'piñata', // Tipo por defecto
    cantidad: 1,
  };

  constructor(
    private componentService: ComponentService,
    private packageService: PackageService
  ) {}

  ngOnInit() {
    this.loadPackages(); // Cargar paquetes al iniciar
  }

  // Cargar los paquetes desde el backend
 loadPackages() {
    this.packageService.getPackages().subscribe(
      (data) => {
        this.paquetes = data;
        if (this.paquetes.length > 0 && this.paquetes[0].id_paquete !== undefined) {
          this.paqueteSeleccionado = this.paquetes[0].id_paquete; // Seleccionar el primer paquete por defecto
          this.loadComponents(); // Cargar los componentes del paquete seleccionado
        } else {
          this.paqueteSeleccionado = null; // Si no hay paquetes, establecer null
          console.warn('No se encontraron paquetes.');
        }
      },
      (error) => {
        console.error('Error al cargar los paquetes:', error);
      }
    );
}


  // Cargar los componentes del paquete seleccionado
  loadComponents() {
    if (this.paqueteSeleccionado) {
      this.componentService.getComponentsByPackage(this.paqueteSeleccionado).subscribe(
        (data) => {
          this.componentes = data;
        },
        (error) => {
          console.error('Error al cargar los componentes:', error);
        }
      );
    }
  }

  // Agregar un nuevo componente
  onSubmit() {
    if (
      this.nuevoComponente.nombre_componente &&
      this.nuevoComponente.tipo_componente &&
      this.nuevoComponente.cantidad > 0
    ) {
      this.componentService.addComponentToPackage(this.nuevoComponente).subscribe(
        (response) => {
          // Agregar el componente al arreglo local
          this.componentes.push({
            id_componente: response.id_componente,
            ...this.nuevoComponente,
          });
          this.resetForm(); // Limpiar el formulario
        },
        (error) => {
          console.error('Error al agregar el componente:', error);
        }
      );
    }
  }

  // Eliminar un componente
  deleteComponent(idComponente?: number) {
    if (idComponente) {
      this.componentService.deleteComponent(idComponente).subscribe(
        () => {
          // Filtrar el componente eliminado de la lista local
          this.componentes = this.componentes.filter((c) => c.id_componente !== idComponente);
        },
        (error) => {
          console.error('Error al eliminar el componente:', error);
        }
      );
    }
  }

  // Resetear el formulario y cerrar el modal
  resetForm() {
    this.nuevoComponente = { id_paquete: this.paqueteSeleccionado || 1, nombre_componente: '', tipo_componente: 'piñata', cantidad: 1 };

    const modalElement = document.getElementById('addComponentModal') as HTMLElement;
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = 'none';
      document.body.classList.remove('modal-open');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }
}
