import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PackageService } from '../../services/package.service'; // Servicio de paquetes
import { Package } from '../../models/package'; // Modelo de paquetes
import { CardPaqueteComponent } from '../../components/card-paquete/card-paquete.component';
import { ComponentService } from '../../services/component.service'; // Servicio para obtener componentes



@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule,FooterComponent,HeaderComponent,CardPaqueteComponent],
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css'
})

export class PaquetesComponent implements OnInit {
  paquetes: Package[] = []; // Lista de paquetes
  componentes: any[] = []; // Lista de componentes del paquete seleccionado
  paqueteSeleccionado: Package | null = null; // Paquete seleccionado

  constructor(
    private packageService: PackageService,
    private componentService: ComponentService
  ) {}

  ngOnInit(): void {
    this.cargarPaquetes();
  }

  // Cargar todos los paquetes disponibles
  cargarPaquetes(): void {
    this.packageService.getPackages().subscribe(
      (data) => {
        this.paquetes = data;
      },
      (error) => {
        console.error('Error al cargar paquetes:', error);
      }
    );
  }

  // Ver los detalles de un paquete
  verDetallesPaquete(paquete: Package): void {
    this.paqueteSeleccionado = paquete;
    this.componentService.getComponentsByPackage(paquete.id_paquete!).subscribe(
      (data) => {
        this.componentes = data;
      },
      (error) => {
        console.error('Error al cargar componentes:', error);
        this.componentes = [];
      }
    );
  }
}
