import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../../services/package.service';
import { Package } from '../../models/package';
import { CardPaqueteComponent } from '../../components/card-paquete/card-paquete.component';

declare var bootstrap: any;

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, RouterModule, CardPaqueteComponent, FormsModule],
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css'],
})
export class PaquetesComponent implements OnInit {
  paquetes: Package[] = [];
  nuevoPaquete: Package = {
    nombre_paquete: '',
    descripcion: '',
    precio_paquete: 0,
    decoracion: '',
  };
  paqueteSeleccionado: Package = {
    nombre_paquete: '',
    descripcion: '',
    precio_paquete: 0,
    decoracion: '',
  };

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  /**
   * Cargar los paquetes desde el backend.
   */
  loadPackages(): void {
    this.packageService.getPackages().subscribe(
      (data: Package[]) => {
        this.paquetes = data;
      },
      (error) => {
        console.error('Error al cargar los paquetes:', error);
      }
    );
  }

  /**
   * Manejar el formulario para agregar un nuevo paquete.
   */
  onSubmit(): void {
    if (
      this.nuevoPaquete.nombre_paquete &&
      this.nuevoPaquete.descripcion &&
      this.nuevoPaquete.precio_paquete > 0 &&
      this.nuevoPaquete.decoracion
    ) {
      this.packageService.createPackage(this.nuevoPaquete).subscribe(
        (response) => {
          console.log('Paquete creado:', response);
          this.loadPackages();
          this.resetForm();
        },
        (error) => {
          console.error('Error al crear el paquete:', error);
        }
      );
    }
  }

  /**
   * Resetear el formulario y cerrar el modal.
   */
  resetForm(): void {
    this.nuevoPaquete = {
      nombre_paquete: '',
      descripcion: '',
      precio_paquete: 0,
      decoracion: '',
    };

    const modalElement = document.getElementById('addPackageModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();
  }

  /**
   * Eliminar un paquete por su ID.
   */
  deletePackage(idPaquete: number): void {
    this.packageService.deletePackage(idPaquete).subscribe(
      (response) => {
        console.log('Paquete eliminado:', response);
        this.loadPackages();
      },
      (error) => {
        console.error('Error al eliminar el paquete:', error);
      }
    );
  }

  /**
   * Cargar los datos del paquete seleccionado en el modal de edición.
   */
  editPackage(paquete: Package): void {
    this.paqueteSeleccionado = { ...paquete };
  }

  /**
   * Actualizar el paquete seleccionado.
   */
  onUpdate(): void {
    if (this.paqueteSeleccionado.id_paquete) {
      this.packageService.updatePackage(this.paqueteSeleccionado.id_paquete, this.paqueteSeleccionado).subscribe(
        (response) => {
          console.log('Paquete actualizado:', response);
          this.loadPackages();
          this.closeEditModal();
        },
        (error) => {
          console.error('Error al actualizar el paquete:', error);
        }
      );
    }
  }

  /**
   * Cerrar el modal de edición y limpiar los datos del paquete seleccionado.
   */
  closeEditModal(): void {
    const modalElement = document.getElementById('editPackageModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();
    this.clearSelectedPackage();
  }

  /**
   * Limpiar los datos del paquete seleccionado.
   */
  clearSelectedPackage(): void {
    this.paqueteSeleccionado = {
      nombre_paquete: '',
      descripcion: '',
      precio_paquete: 0,
      decoracion: '',
    };
  }

  viewDetails(paquete: Package): void {
    console.log('Detalles del paquete:', paquete);
    // Aquí puedes agregar la lógica que necesites, como redirigir a otra página o mostrar un modal
  }
  
}

