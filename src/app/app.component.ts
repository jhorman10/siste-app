import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'siste-app';
  isLoading: boolean = true;

  // Simula una carga de datos
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); // Simulando 2 segundos de carga
  }
}
