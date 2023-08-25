import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SpinnerComponent],
  imports: [CommonModule, AppRoutingModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    SharedRoutingModule,
  ],
})
export class SharedModule {}
