import { Component, OnInit } from "@angular/core";
import { CheckListFormComponent } from "./form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { CheckListApiService } from "../../../@core/api/check-list.resource.service";
import { CheckList } from "../../../@core/models/CheckList";
import { LayoutService } from "../../../@core/utils";
import { UserApiService } from "../../../@core/api/user.resource.service";
import { ShopApiService } from "../../../@core/api/shop.resource.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "batiste-check-list-edit",
  templateUrl: "./form.component.html",
})
export class CheckListEditComponent extends CheckListFormComponent implements OnInit {
  constructor(
    checkListApi: CheckListApiService,
    router: Router,
    ls: LayoutService,
    protected formBuilder: FormBuilder,
    protected shopApi: ShopApiService,
    protected userApi: UserApiService,
    private route: ActivatedRoute
  ) {
    super(checkListApi, router, ls, formBuilder, shopApi, userApi);
  }

  onSubmit() {
    this.customerApi
      .update(this.checkList, this.form.value, {
        toast: { success: { title: "CheckList" } },
      })
      .subscribe((checkList: CheckList) => {
        this.router.navigate(["/check-lists/list"]);
      });
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Edit checkList";
    this.ls.hasBack = true;
    this.route.data.subscribe((data: { checkList: CheckList }) => {
      this.checkList = data.checkList;
      this.checkList.checkListItems.forEach((cl) => {
        this.addCheckListItem();
      });
      this.form.patchValue(data.checkList);
    });
  }
}
