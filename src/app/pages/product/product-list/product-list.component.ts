import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products: Product[] = [];
  public productDeletedSubscription!: Subscription;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public productService: ProductService
  ) {
    this.products = this.productService.getProducts();

    this.productDeletedSubscription =
      this.productService.productDeleted.subscribe((deletedProductId) => {
        this.products = this.products.filter(
          (product) => product.id !== deletedProductId
        );
      });
  }
  ngOnInit(): void {
    this.products = this.route.snapshot.data['products'];
  }

  ngOnChanges() {
    this.productService.loadProductsFromJson();
  }

  editProduct(id: number): void {
    this.router.navigate(['/product/edit', id]);
  }

  deleteProduct(id: number): void {
    this.productService.deleteProductById(id);
    this.router.navigate(['/list']);
  }
}
