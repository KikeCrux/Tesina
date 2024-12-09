import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;
@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  paquetes: any[] = [];
  paquetesFiltrados: any[] = [];
  estatusSeleccionado: string = 'Pendiente';
  pedidoSeleccionado: number | null = null;
  nuevoEstatus: string = 'Pendiente';

  private apiUrl = 'http://localhost:3000/api/paquetes';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        console.log('Datos cargados:', data);
        this.paquetes = data.map((paquete, index) => ({
          ...paquete,
          id_pedido: index + 1,
          nombre_usuario: this.normalizeString(paquete.nombre_usuario),
          status: paquete.status || 'Pendiente'
        }));
        this.paquetesFiltrados = this.filtrarPaquetes(this.paquetes);
        console.log('Paquetes filtrados:', this.paquetesFiltrados);
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


  eliminarPedido(idPedido: number): void {
    this.pedidoSeleccionado = idPedido;

    // Abre el modal
    const modalElement = document.getElementById('confirmModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  confirmarEliminacion(): void {
    if (this.pedidoSeleccionado !== null) {
      // Eliminar el pedido seleccionado
      this.paquetes = this.paquetes.filter(pedido => pedido.id_pedido !== this.pedidoSeleccionado);
      this.paquetesFiltrados = this.paquetesFiltrados.filter(pedido => pedido.id_pedido !== this.pedidoSeleccionado);

      // Cerrar el modal
      const modalElement = document.getElementById('confirmModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();

      this.pedidoSeleccionado = null;
    }
  }

  abrirModalCambioEstatus(idPedido: number): void {
    this.pedidoSeleccionado = idPedido;

    const pedido = this.paquetes.find(p => p.id_pedido === idPedido);
    if (pedido) {
      this.nuevoEstatus = pedido.status;
    }

    // Abre el modal
    const modalElement = document.getElementById('estatusModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  confirmarCambioEstatus(): void {
    if (this.pedidoSeleccionado !== null) {
      // Actualiza el estatus del pedido seleccionado
      const pedido = this.paquetes.find(p => p.id_pedido === this.pedidoSeleccionado);
      if (pedido) {
        pedido.status = this.nuevoEstatus;
        this.aplicarFiltro(); // Reaplica el filtro para reflejar los cambios
      }

      // Cierra el modal
      const modalElement = document.getElementById('estatusModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();

      this.pedidoSeleccionado = null;
    }
  }

}
