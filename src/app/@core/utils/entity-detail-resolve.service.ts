import { Injectable, NgZone } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityResourceInterface, EntityResourceService } from '../api/entity.resource.service';

@Injectable()
export class EntityDetailResolve implements Resolve<Observable<any>>{
  constructor(
    private EntityApi: EntityResourceService, 
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    
    let params = route.paramMap.get('id').split('-');
    let object = EntityResourceService.createClass(
      params[0].charAt(0).toUpperCase() + params[0].slice(1)
    );
    object.id = params[1];

    return this.EntityApi.find(object).pipe(map((res:EntityResourceInterface) => {
      //console.log(res);
      if (res) {
       return res;
      } else {
        this.router.navigate (['/404']);
        return false;
      }
    }));
  }
}