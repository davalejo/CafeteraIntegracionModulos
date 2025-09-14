// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Importamos los componentes de auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Importamos los componentes de features
import { PedidosListComponent } from './features/pedidos/pedidos-list/pedidos-list.component';
import { PedidosFormComponent } from './features/pedidos/pedidos-form/pedidos-form.component';
import { ProductoresListComponent } from './features/productores/productores-list/productores-list.component';
import { ProductoresFormComponent } from './features/productores/productores-form/productores-form.component';

// Importamos el guard
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // ✅ Rutas públicas
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // ✅ Rutas protegidas (solo con sesión activa)
    { path: 'pedidos', component: PedidosListComponent, canActivate: [AuthGuard] },
    { path: 'pedidos/nuevo', component: PedidosFormComponent, canActivate: [AuthGuard] },
    { path: 'productores', component: ProductoresListComponent, canActivate: [AuthGuard] },
    { path: 'productores/nuevo', component: ProductoresFormComponent, canActivate: [AuthGuard] },

    // ✅ Redirección por defecto
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];