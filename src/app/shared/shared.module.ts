import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [HeaderComponent, SideBarComponent, FooterComponent],
  imports: [CommonModule, AppRoutingModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    SideBarComponent,
    FooterComponent,
    SharedRoutingModule,
  ],
})
export class SharedModule {}
