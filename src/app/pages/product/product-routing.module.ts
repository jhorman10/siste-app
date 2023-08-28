import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';

@Injectable({ providedIn: 'root' })
export class ProductResolver {
  constructor(public productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    return of(this.productService.getProducts());
  }
}

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ProductListComponent,
        resolve: { products: ProductResolver },
      },
      { path: 'add', component: NewProductFormComponent },
      { path: 'edit/:id', component: NewProductFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
