import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CardsComponent } from './components/cards/cards.component';
import { PaquetesComponent as ClientePaquetesComponent } from './pages/paquetes/paquetes.component';

/*Dashboard*/
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { PaquetesComponent } from './admin/paquetes/paquetes.component';
import { ComponentesComponent } from './admin/componentes/componentes.component';
import { PedidosComponent } from './admin/pedidos/pedidos.component';
import { MayoristasComponent } from './admin/mayoristas/mayoristas.component';
import { PinatasComponent } from './admin/pinatas/pinatas.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contactanos', component: ContactComponent },
    { path: 'productos', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { path: 'paquetes', component: ClientePaquetesComponent }, // Ruta directa para paquetes
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'paquetes', component: PaquetesComponent },
            { path: 'componentes', component: ComponentesComponent },
            { path: 'pedidos', component: PedidosComponent },
            { path: 'mayoristas', component: MayoristasComponent },
            { path: 'pinatas', component: PinatasComponent },
            { path: '', redirectTo: 'paquetes', pathMatch: 'full' },
        ],
    },
    { path: 'card', component: CardsComponent },
    { path: '**', redirectTo: '' },
];

