import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { CheckListApiService } from "../../../@core/api/check-list.resource.service";
import { LayoutService } from "../../../@core/utils";
import { CheckList, CHECK_LIST_STATUS_PENDING } from "../../../@core/models/CheckList";
import { ShopApiService } from "../../../@core/api/shop.resource.service";
import { Shop } from "../../../@core/models/Shop";
import { UserApiService } from "../../../@core/api/user.resource.service";
import { User } from "../../../@core/models/User";
import { CHECK_LIST_ITEM_STATUS_PENDING, WIDGET_TYPES } from "../../../@core/models/CheckListItem";

export abstract class CheckListFormComponent {
  checkList: CheckList = new CheckList();
  quote: CheckList = new CheckList();
  form: FormGroup = new FormGroup({});
  isShopsLoading: boolean = false;
  isWorkersLoading: boolean = false;
  shops: Shop[] = [];
  workers: User[] = [];
  widgetTypes = [...WIDGET_TYPES];

  constructor(
    protected customerApi: CheckListApiService,
    protected router: Router,
    protected ls: LayoutService,
    protected formBuilder: FormBuilder,
    protected shopApi: ShopApiService,
    protected userApi: UserApiService
  ) {
    this.fetchShops();
    this.fetchWorkers();
    this.form = new FormGroup({
      name: new FormControl(""),
      status: new FormControl(CHECK_LIST_STATUS_PENDING),
      shopId: new FormControl(""),
      workerId: new FormControl(""),
      checkListItems: this.formBuilder.array([]),
    });
  }

  deleteCheckListItem(index: number) {
    this.checkListItems.removeAt(index);
  }

  addCheckListItem() {
    const checkListItemForm = this.formBuilder.group({
      id: [""],
      name: [""],
      description: [""],
      widgetType: [""],
      status: [CHECK_LIST_ITEM_STATUS_PENDING]
    });

    this.checkListItems.push(checkListItemForm);
  }

  get checkListItems() {
    return this.form.controls["checkListItems"] as FormArray;
  }

  fetchShops() {
    this.isShopsLoading = true;
    this.shopApi.findAll(new Shop()).subscribe((shops: Shop[]) => {
      this.shops = shops;
      this.isShopsLoading = false;
    });
  }

  fetchWorkers() {
    this.isWorkersLoading = true;
    this.userApi.findAllWorkers().subscribe((workers: User[]) => {
      this.workers = workers;
      this.isWorkersLoading = false;
    });
  }
}
