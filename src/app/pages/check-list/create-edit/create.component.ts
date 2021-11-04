import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CheckListApiService } from "../../../@core/api/check-list.resource.service";
import { LayoutService } from "../../../@core/utils";
import { CheckList } from "../../../@core/models/CheckList";

import { CheckListFormComponent } from "./form.component";
import { UserApiService } from "../../../@core/api/user.resource.service";
import { ShopApiService } from "../../../@core/api/shop.resource.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "batiste-check-list-create",
  templateUrl: "./form.component.html",
})
export class CheckListCreateComponent extends CheckListFormComponent {
  constructor(
    checkListApi: CheckListApiService,
    router: Router,
    ls: LayoutService,
    protected formBuilder: FormBuilder,
    protected shopApi: ShopApiService,
    protected userApi: UserApiService
  ) {
    super(checkListApi, router, ls, formBuilder, shopApi, userApi);
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Create new checkList";
    this.ls.hasBack = true;
  }

  onSubmit() {
    this.customerApi
      .create(this.checkList, this.form.value)
      .subscribe((checkList: CheckList) => {
        this.router.navigate(["/check-lists/list"]);
      });
  }
}
