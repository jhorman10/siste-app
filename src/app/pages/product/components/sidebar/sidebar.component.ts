import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  options = [
    { name: 'Add Product', url: '/product/add' },
    { name: 'Product List', url: '/product/list' },
  ];

}
