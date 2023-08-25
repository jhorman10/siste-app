import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent {
  users: User[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }
}
