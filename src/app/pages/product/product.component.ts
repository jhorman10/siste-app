import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SpinnerService } from './../../services/spinner.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {

  constructor(
    private productService: ProductService,
    private spinnerService: SpinnerService
  ) {}
  isLoading$ = this.spinnerService.isLoading$;

  ngOnInit() {
    this.productService.saveProductsIfEmpty();
    this.spinnerService.setSpinner();
  }
}
