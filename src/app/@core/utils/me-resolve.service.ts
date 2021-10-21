import { Injectable, NgZone } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityResourceInterface, EntityResourceService } from '../api/entity.resource.service';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable()
export class MeResolve implements Resolve<Observable<any>>{
  constructor(
    protected authService: AuthService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.authService.me().pipe(map((res:EntityResourceInterface) => {
      return res?EntityResourceService.hydrate(new User(), res):null;
    }));
  }
}