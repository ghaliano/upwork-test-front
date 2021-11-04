import { Component, OnInit } from "@angular/core";
import { ShopFormComponent } from "./form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { ShopApiService } from "../../../@core/api/shop.resource.service";
import { Shop } from "../../../@core/models/Shop";
import { LayoutService } from "../../../@core/utils";
import { UserApiService } from "../../../@core/api/user.resource.service";

@Component({
  selector: "batiste-shop-edit",
  templateUrl: "./form.component.html",
})
export class ShopEditComponent extends ShopFormComponent implements OnInit {
  constructor(
    shopApi: ShopApiService,
    router: Router,
    ls: LayoutService,
    userApi: UserApiService,
    private route: ActivatedRoute
  ) {
    super(shopApi, router, ls, userApi);
  }

  onSubmit() {
    this.customerApi
      .update(this.shop, this.form.value, {
        toast: { success: { title: "Shop" } },
      })
      .subscribe((shop: Shop) => {
        this.router.navigate(["/shops/list"]);
      });
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Edit shop";
    this.ls.hasBack = true;
    this.route.data.subscribe((data: { shop: Shop }) => {
      this.shop = data.shop;
      this.form.patchValue(data.shop);
    });
  }
}
