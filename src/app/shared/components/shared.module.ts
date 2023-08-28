import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, SpinnerComponent],
})
export class SharedModule {}
