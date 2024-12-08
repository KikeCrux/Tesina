import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  paquetes: any[] = [];
  paquetesFiltrados: any[] = [];
  estatusSeleccionado: string = 'Pendiente'; // Valor inicial del filtro
  private apiUrl = 'http://localhost:3000/api/paquetes';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        console.log('Datos cargados:', data); // Verifica los valores
        this.paquetes = data.map(paquete => ({
          ...paquete,
          nombre_usuario: this.normalizeString(paquete.nombre_usuario),
          status: paquete.status || 'Pendiente'
        }));
        this.paquetesFiltrados = this.filtrarPaquetes(this.paquetes);
        console.log('Paquetes filtrados:', this.paquetesFiltrados); // Verifica después del filtrado
      },
      (error) => {
        console.error('Error al cargar los paquetes:', error);
      }
    );
  }


  normalizeString(input: string): string {
    if (!input) return input;
    return input
      .replace(/Ã¡/g, 'á')
      .replace(/Ã©/g, 'é')
      .replace(/Ã­/g, 'í')
      .replace(/Ã³/g, 'ó')
      .replace(/Ãº/g, 'ú')
      .replace(/Ã±/g, 'ñ')
      .replace(/Ã/g, 'Ñ');
  }

  aplicarFiltro(): void {
    // Filtrar los paquetes por estatus seleccionado
    this.paquetesFiltrados = this.paquetes.filter(
      (paquete) => paquete.status === this.estatusSeleccionado
    );
  }

  cambiarEstatusFiltro(estatus: string): void {
    this.estatusSeleccionado = estatus; // Cambiar el estatus seleccionado
    this.aplicarFiltro(); // Aplicar el filtro nuevamente
  }

  filtrarPaquetes(paquetes: any[]): any[] {
    return paquetes.filter(paquete =>
      paquete.nombre_usuario &&
      paquete.nombre_usuario.trim() !== '' &&
      paquete.nombre_usuario !== 'Sin usuario'
    );
  }

  eliminarPaquete(paqueteId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paquete?')) {
      this.http.delete(`http://localhost:3000/api/paquetes/${paqueteId}`).subscribe(
        (response: any) => {
          console.log(response.message);
          this.paquetesFiltrados = this.paquetesFiltrados.filter(paquete => paquete.id_paquete !== paqueteId);
          this.paquetes = this.paquetes.filter(paquete => paquete.id_paquete !== paqueteId);
        },
        (error) => {
          console.error('Error al eliminar el paquete:', error);
        }
      );
    }
  }


}
