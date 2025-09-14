import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoresService } from '../../../core/services/productores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productores-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productores-list.component.html',
  styleUrls: ['./productores-list.component.css']
})
export class ProductoresListComponent implements OnInit {
  productores: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private productoresService: ProductoresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.productoresService.getAll().subscribe({
      next: (data) => {
        this.productores = data || [];
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Error al cargar productores';
        this.loading = false;
      }
    });
  }

  onNew() {
    this.router.navigate(['/productores/nuevo']);
  }

  onEdit(p: any) {
    this.router.navigate(['/productores/nuevo'], { state: { productor: p } });
  }

  onDelete(id: string) {
    if (!confirm('¿Eliminar productor?')) return;
    this.productoresService.delete(id).subscribe({
      next: () => this.load(),
      error: () => alert('No se pudo eliminar')
    });
  }
}