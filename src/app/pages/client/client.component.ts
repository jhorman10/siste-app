import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  constructor(private spinnerService: SpinnerService) {}
  isLoading$ = this.spinnerService.isLoading$;

  ngOnInit() {
    this.spinnerService.setSpinner();
  }
}
