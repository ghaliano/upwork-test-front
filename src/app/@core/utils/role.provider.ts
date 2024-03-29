
import { NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

export class RoleProvider extends NbRoleProvider {
    getRole() {
      // here you could provide any role based on any auth flow
      return observableOf('user');
    }
  }