/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { NbIconLibraries, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  
  constructor(
    protected router: Router,
    private iconLibraries: NbIconLibraries,
    private nbMenuService: NbMenuService,
    private nbAuthService: NbAuthService) {
    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fas', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('regular', { packClass: 'far', iconClassPrefix: 'fa' });
    this.iconLibraries.registerFontPack('solid', { packClass: 'fas', iconClassPrefix: 'fa' });
  }

  ngOnInit(): void { 
    this.nbMenuService.onItemClick().subscribe((menu: any) => {
    if (menu.item.data == 'logout') {
      if(confirm("Se déconnecter ?")){
        this.logout('email');
        return false;
      }
    } 
  });
}

  logout(strategy: string): void {
    this.nbAuthService.logout(strategy).subscribe((result: NbAuthResult) => {
      return this.router.navigate(['/auth/login']);
    });
  }
}