import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ContactComponent
  ]
})
export class HomeModule { }
