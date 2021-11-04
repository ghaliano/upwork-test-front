import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopApiService } from '../../../@core/api/shop.resource.service';
import { LayoutService } from '../../../@core/utils';
import { Shop } from '../../../@core/models/Shop';
import { UserApiService } from '../../../@core/api/user.resource.service';
import { User } from '../../../@core/models/User';

export abstract class ShopFormComponent{
  shop: Shop = new Shop();
  quote: Shop = new Shop();
  form: FormGroup = new FormGroup({});
  isWorkersLoading:boolean=false;
  workers:User[] = [];

  constructor(
    protected customerApi: ShopApiService,
    protected router: Router,
    protected ls: LayoutService,
    protected userApi: UserApiService,
  ) {
    this.fetchWorkers();
    this.form = new FormGroup({
      name: new FormControl(''),
      workerId: new FormControl('')
    });
  }

  fetchWorkers(){
    this.isWorkersLoading = true;
    this.userApi.findAllWorkers().subscribe((workers: User[])=>{
      this.workers = workers;
      this.isWorkersLoading = false;
    });
  }
}
