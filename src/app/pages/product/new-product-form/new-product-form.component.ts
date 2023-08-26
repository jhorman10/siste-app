import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss'],
})
export class NewProductFormComponent implements OnInit {
  productId!: number;
  editedProduct!: Product;

  constructor(
    public productService: ProductService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.params['id'];

    this.editedProduct = this.productId
      ? this.productService.getProductById(this.productId) || {
          id: this.productId,
          name: '',
          description: '',
          price: 1,
        }
      : {
          id: 0,
          name: '',
          description: '',
          price: 1,
        };
  }

  saveProduct() {
    if (
      this.editedProduct.name &&
      this.editedProduct.description &&
      this.editedProduct.price
    ) {
      if (this.productId) {
        this.productService.updateProduct(this.editedProduct);
      } else {
        this.productService.addProduct(this.editedProduct);
      }

      this.editedProduct = {
        id: 0,
        name: '',
        description: '',
        price: 0,
      };

      this.router.navigate(['/product/list']);
    }
  }
}
