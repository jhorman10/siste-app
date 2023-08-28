import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/components/shared.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';

@NgModule({
    declarations: [
        ProductComponent,
        ProductListComponent,
        NewProductFormComponent,
        SidebarComponent,
    ],
    imports: [CommonModule, ProductRoutingModule, FormsModule, HttpClientModule, SharedModule]
})
export class ProductModule {}
