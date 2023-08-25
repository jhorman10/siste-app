import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductComponent } from './product.component';


@NgModule({
  declarations: [
    ProductComponent,
    NewProductComponent,
    NewProductFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ProductComponent,
    NewProductComponent,
    NewProductFormComponent
  ]
})
export class ProductModule { }
