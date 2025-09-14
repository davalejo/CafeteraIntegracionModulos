import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule],
    template: `
    <header class="header">
      <nav>
        <ul>
          <li><a routerLink="/login" routerLinkActive="active">Login</a></li>
          <li><a routerLink="/register" routerLinkActive="active">Registro</a></li>
          <li><a routerLink="/productores" routerLinkActive="active">Productores</a></li>
          <li><a routerLink="/pedidos" routerLinkActive="active">Pedidos</a></li>
        </ul>
      </nav>
    </header>
  `,
    styleUrls: ['./header.component.css']
})
export class HeaderComponent { }