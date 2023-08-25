import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ClientListComponent } from './client-list/client-list.component';
import { ClientComponent } from './client.component';



@NgModule({
    declarations: [
        ClientComponent,
        ClientListComponent
    ],
    exports: [
        ClientComponent,
        ClientListComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule
    ]
})
export class ClientModule { }
