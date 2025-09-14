import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from '../../../core/services/pedidos.service';

@Component({
  selector: 'app-pedidos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-list.component.html',
  styleUrls: ['./pedidos-list.component.scss']
})
export class PedidosListComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.pedidosService.getAll().subscribe((data) => {
      this.pedidos = data;
    });
  }
}