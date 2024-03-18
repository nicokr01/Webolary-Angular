import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path:"login",
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path:"home",
        component: HomeComponent
    }
];
