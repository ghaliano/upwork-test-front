import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router"
import { CheckList } from "../../../@core/models/CheckList";
import { LayoutService } from "../../../@core/utils";

@Component({
  selector: "batiste-check-list-show",
  templateUrl: "./show.component.html",
})
export class CheckListShowComponent  implements OnInit {
  checkList: CheckList = new CheckList();

  constructor(
    protected ls: LayoutService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
      this.ls.layoutTitle = "Show checkup";
      this.ls.hasBack = true;
      this.route.data.subscribe((data: { checkList: CheckList }) => {
        this.checkList = data.checkList;
    }); 
  }
}