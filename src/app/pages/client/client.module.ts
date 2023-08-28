import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "../../shared/components/shared.module";
import { ClientListComponent } from './client-list/client-list.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

@NgModule({
    declarations: [ClientComponent, ClientListComponent],
    imports: [CommonModule, ClientRoutingModule, HttpClientModule, SharedModule]
})
export class ClientModule {}
