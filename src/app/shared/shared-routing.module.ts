import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ClientComponent } from '../pages/client/client.component';
import { HomeComponent } from '../pages/home/home.component';
import { NewProductFormComponent } from '../pages/product/new-product-form/new-product-form.component';
import { ProductListComponent } from '../pages/product/product-list/product-list.component';
import { ProductComponent } from '../pages/product/product.component';
import { ProductService } from '../services/product.service';

@Injectable({ providedIn: 'root' })
export class ProductResolver {
  constructor(private productService: ProductService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    return of(this.productService.getProducts());
  }
}

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'client', component: ClientComponent },
  {
    path: 'product',
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
  { path: '', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
