import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {

  constructor(
    public productService: ProductService,
    public spinnerService: SpinnerService
  ) {}
  isLoading$ = this.spinnerService.isLoading$;

  ngOnInit() {
    this.productService.saveProductsIfEmpty();
    this.spinnerService.setSpinner();
  }
}
