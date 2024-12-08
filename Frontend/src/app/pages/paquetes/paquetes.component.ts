import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PackageService } from '../../services/package.service'; // Servicio de paquetes
import { Package } from '../../models/package'; // Modelo de paquetes
import { CardPaqueteComponent } from '../../components/card-paquete/card-paquete.component';
import { ComponentService } from '../../services/component.service'; // Servicio para obtener componentes
import { AuthService } from '../../services/auth.service'; // Servicio de autenticación
import { HttpClient } from '@angular/common/http'; // Para enviar solicitudes HTTP
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [CommonModule, FooterComponent, HeaderComponent, CardPaqueteComponent, FormsModule],
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css'],
})
export class PaquetesComponent implements OnInit {
  paquetes: Package[] = []; // Lista de paquetes
  componentes: any[] = []; // Lista de componentes del paquete seleccionado
  paqueteSeleccionado: Package | null = null; // Paquete seleccionado
  nombreUsuario: string | null = null; // Nombre del usuario autenticado

  // Método de entrega
  metodoEntrega: string = 'tienda'; // Valor predeterminado
  direccion: string = ''; // Dirección para entrega a domicilio

  constructor(
    private packageService: PackageService,
    private componentService: ComponentService,
    private authService: AuthService,
    private http: HttpClient // Para enviar solicitudes HTTP al backend
  ) {}

  ngOnInit(): void {
    this.cargarPaquetes();
    this.obtenerUsuario();
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

  // Obtener el usuario autenticado
  obtenerUsuario(): void {
    const usuario = this.authService.decodeToken();
    this.nombreUsuario = usuario ? usuario.nombre_cliente : null; // Obtener el nombre del usuario si está logueado
  }

  // Adquirir un paquete
  adquirirPaquete(paquete: Package): void {
    this.paqueteSeleccionado = paquete;

    // Abrir modal para seleccionar método de entrega
    const modalElement = document.getElementById('metodoEntregaModal') as HTMLElement;
    const modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
  }

  // Guardar método de entrega y enviar paquete al backend
  guardarMetodoEntrega(): void {
    if (!this.paqueteSeleccionado) return;
  
    const paquetesAdquiridos = JSON.parse(localStorage.getItem('paquetesAdquiridos') || '[]');

    console.log('Datos enviados al backend:', paquetesAdquiridos);

  
    const paqueteAdquirido = {
      id_paquete: this.paqueteSeleccionado.id_paquete,
      nombre_paquete: this.paqueteSeleccionado.nombre_paquete,
      descripcion: this.paqueteSeleccionado.descripcion,
      precio_paquete: this.paqueteSeleccionado.precio_paquete,
      decoracion: this.paqueteSeleccionado.decoracion,
      nombre_usuario: this.nombreUsuario || 'Sin usuario',
      metodo_entrega: this.metodoEntrega,
      ...(this.metodoEntrega === 'domicilio' && { direccion: this.direccion }),
    };
  
    // Agregar paquete al arreglo
    paquetesAdquiridos.push(paqueteAdquirido);
  
    // Guardar en localStorage
    localStorage.setItem('paquetesAdquiridos', JSON.stringify(paquetesAdquiridos));
  
    // Enviar los datos al backend
    this.http.post('http://localhost:3000/api/save-paquetes', paquetesAdquiridos).subscribe(
      (response) => {
        console.log('Datos guardados correctamente:', response);
      },
      (error) => {
        console.error('Error al guardar los datos:', error);
      }
    );     
  
    // Cerrar modal
    const modalElement = document.getElementById('metodoEntregaModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance?.hide();
  }  

  // Resetear valores del formulario de entrega
  resetFormularioEntrega(): void {
    this.metodoEntrega = 'tienda';
    this.direccion = '';
  }

  // Ver los detalles de un paquete
  verDetallesPaquete(paquete: Package): void {
    this.paqueteSeleccionado = paquete;
  
    // Llamada al servicio para obtener los componentes del paquete
    this.componentService.getComponentsByPackage(paquete.id_paquete!).subscribe(
      (data) => {
        this.componentes = data;
      },
      (error) => {
        console.error('Error al cargar componentes:', error);
        this.componentes = [];
      }
    );
  
    // Inicializa el modal de manera segura
    const modalElement = document.getElementById('detallesPaqueteModal') as HTMLElement;
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
      modalInstance.show();
    } else {
      console.error('Modal detallesPaqueteModal no encontrado');
    }
  }
  
}
