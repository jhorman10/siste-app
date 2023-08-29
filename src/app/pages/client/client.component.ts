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
    <div class="user-details">
      <ul class="user-details__list">
        <li class="user-details__item"><strong class="user-details__label">Name:</strong> ${ user.name }</li>
        <li class="user-details__item"><strong class="user-details__label">Username:</strong> ${ user.username }</li>
        <li class="user-details__item"><strong class="user-details__label">Email:</strong> ${ user.email }</li>
        <li class="user-details__item"><strong class="user-details__label">Address:</strong> ${ user.address.street }, ${ user.address.suite }, ${ user.address.city }, ${ user.address.zipcode }</li>
        <li class="user-details__item"><strong class="user-details__label">Phone:</strong> ${ user.phone }</li>
        <li class="user-details__item"><strong class="user-details__label">Website:</strong> ${ user.website }</li>
        <li class="user-details__item"><strong class="user-details__label">Company:</strong> ${ user.company.name }, ${ user.company.catchPhrase }, ${ user.company.bs }</li>
      </ul>
    </div>
    `;

    Swal.fire({
      title: 'Client Details',
      html: userDetails,
      icon: 'info',
      showCloseButton: true,
      customClass: {
        container: 'user-details-swal',
        htmlContainer: 'user-details__list-swal',
      },
    });
  }
}
