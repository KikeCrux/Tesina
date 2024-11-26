import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { PaquetesComponent } from "../paquetes/paquetes.component";
import { ComponentesComponent } from '../componentes/componentes.component';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { MayoristasComponent } from '../mayoristas/mayoristas.component';
import { PinatasComponent } from '../pinatas/pinatas.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, SidebarComponent, PaquetesComponent, ComponentesComponent, PedidosComponent, MayoristasComponent, PinatasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
