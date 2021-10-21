import { Component } from '@angular/core';
import { NbAuthComponent, NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent extends NbAuthComponent {
}