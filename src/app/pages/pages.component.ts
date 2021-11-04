import { Component } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { User } from '../@core/models/User';

import { getMenuByRole } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  user:User;

  menu = [];

  constructor(private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload() as User;  
          this.menu = getMenuByRole(this.user.role);
        }

      });
  }
}
