import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientModule } from './pages/client/client.module';
import { HomeComponent } from './pages/home/home.component';
import { HomeModule } from "./pages/home/home.module";
import { ProductModule } from './pages/product/product.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ClientModule,
        ProductModule,
        HomeModule
    ]
})
export class AppModule { }
