import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  options = [
    { name: 'Home', url: 'home' },
    { name: 'Client', url: 'client' },
    // { name: 'Episodes', url: 'episodes' },
    // { name: 'Locations', url: 'locations' },
  ];
  activeOption = '/';

}
