import { Routes } from '@angular/router';
import { PasswordComponent } from './components/password/password.component';

export const routes: Routes = [
    {
        path: 'password',
        component: PasswordComponent,
    },
    {
        path: '',
        redirectTo: 'password',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'password'
    }
];
