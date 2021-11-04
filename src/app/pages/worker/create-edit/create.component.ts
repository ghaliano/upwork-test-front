import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserApiService } from "../../../@core/api/user.resource.service";
import { LayoutService } from "../../../@core/utils";

import { WorkerFormComponent } from "./form.component";
import { User } from "../../../@core/models/User";

@Component({
  selector: "batiste-worker-create",
  templateUrl: "./form.component.html",
})
export class WorkerCreateComponent extends WorkerFormComponent {
  constructor(userApi: UserApiService, router: Router, protected ls: LayoutService) {
    super(userApi, router);
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Create new worker";
    this.ls.hasBack = true;
  }

  onSubmit() {
    this.userApi
      .create(new User, this.form.value)
      .subscribe(() => {
        this.router.navigate(["/workers/list"]);
      });
  }
}
