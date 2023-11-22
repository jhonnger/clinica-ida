import { Component } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
   toggleDropdown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = target.nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      dropdown.classList.toggle('show');
    }
  }

}
