import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared.module";
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';


@NgModule({
    declarations: [
        ProductComponent,
        NewProductFormComponent,
        ProductListComponent,
        SidebarComponent
    ],
    exports: [
        ProductComponent,
        NewProductFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule
    ]
})
export class ProductModule { }
