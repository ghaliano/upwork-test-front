import { Component, OnInit } from "@angular/core";
import { WorkerFormComponent } from "./form.component";
import { ActivatedRoute, Router } from "@angular/router";
import { LayoutService } from "../../../@core/utils";
import { UserApiService } from "../../../@core/api/user.resource.service";
import { User } from "../../../@core/models/User";

@Component({
  selector: "batiste-worker-edit",
  templateUrl: "./form.component.html",
})
export class WorkerEditComponent extends WorkerFormComponent implements OnInit {
  constructor(
    userApi: UserApiService,
    router: Router,
    private ls: LayoutService,
    private route: ActivatedRoute
  ) {
    super(userApi, router);
  }

  onSubmit() {
    this.userApi
      .update(new User(this.worker.id), this.form.value)
      .subscribe(() => {
        this.router.navigate(["/workers/list"]);
      });
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Edit worker";
    this.ls.hasBack = true;
    this.route.data.subscribe((data: { worker: User }) => {
      this.worker = data.worker;
      this.form.patchValue(data.worker);
    });
  }
}
