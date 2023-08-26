import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent {
  users: User[] = [];

  constructor(
    public spinnerService: SpinnerService,
    public clientService: ClientService
  ) {}
  isLoading$ = this.spinnerService.isLoading$;

  ngOnInit() {
    this.spinnerService.setSpinner();
    this.clientService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  showClientDetails(user: User): void {
    const userDetails = `
      Name: ${user.name}
      Username: ${user.username}
      Email: ${user.email}
      Address: ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}
      Phone: ${user.phone}
      Website: ${user.website}
      Company: ${user.company.name}, ${user.company.catchPhrase}, ${user.company.bs}
    `;

    Swal.fire({
      title: 'Client Details',
      html: userDetails,
      icon: 'info',
      showCloseButton: true,
      customClass: {
        container: 'custom-swal-container',
        title: 'custom-swal-title',
        htmlContainer: 'custom-swal-html-container',
      },
    });
  }

}
