import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContactComponent } from './contact/contact.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
