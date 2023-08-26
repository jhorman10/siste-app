import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent {
  @Input()
  users!: User[];

  @Output()
  showClientDetails = new EventEmitter<User>();

  onCardClick(user: User): void {
    this.showClientDetails.emit(user);
  }
}
