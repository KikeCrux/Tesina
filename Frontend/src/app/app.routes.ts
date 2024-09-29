import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductsComponent } from './pages/products/products.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contactanos', component: ContactComponent },
    { path: 'productos', component: ProductsComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
