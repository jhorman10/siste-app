import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(public route: ActivatedRoute, public router: Router) {}
  ngOnInit(): void {
    this.products = this.route.snapshot.data['products'];
  }

  editProduct(id: number): void {
    this.router.navigate(['/product/edit', id]);
  }
}
