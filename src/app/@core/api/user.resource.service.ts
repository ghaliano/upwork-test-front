import { Injectable } from '@angular/core';
import { ROLE_WORKER, User, UserFilter } from '../models/User';
import {
  EntityResourceService,
} from './entity.resource.service';

@Injectable()
export class UserApiService extends EntityResourceService {
  findAllWorkers(filter: UserFilter = {}){
    filter.roles = [ROLE_WORKER];
    return this.findAll(new User, filter);
  }
}
