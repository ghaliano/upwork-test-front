import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { NbRegisterComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/utils/auth.service';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent extends NbRegisterComponent {
  constructor(private authService: AuthService, cd: ChangeDetectorRef, router: Router,  @Inject(NB_AUTH_OPTIONS) protected options = {},){
    super(authService, options, cd, router);
  }

  register() {
    this.authService.register('email', this.user).subscribe((result) => {
      this.user = null;
      this.router.navigate(['/auth/login']);
  });
  }
}