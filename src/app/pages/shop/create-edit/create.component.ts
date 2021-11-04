import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ShopApiService } from "../../../@core/api/shop.resource.service";
import { LayoutService } from "../../../@core/utils";
import { Shop } from "../../../@core/models/Shop";

import { ShopFormComponent } from "./form.component";
import { UserApiService } from "../../../@core/api/user.resource.service";

@Component({
  selector: "batiste-shop-create",
  templateUrl: "./form.component.html",
})
export class ShopCreateComponent extends ShopFormComponent {
  constructor(shopApi: ShopApiService, router: Router, ls: LayoutService, userApi: UserApiService) {
    super(shopApi, router, ls, userApi);
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Create new shop";
    this.ls.hasBack = true;
  }

  onSubmit() {
    this.customerApi
      .create(this.shop, this.form.value)
      .subscribe((shop: Shop) => {
        this.router.navigate(["/shops/list"]);
      });
  }
}
