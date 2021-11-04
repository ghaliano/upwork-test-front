import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { CheckListApiService } from "../../../@core/api/check-list.resource.service";
import { CheckList } from "../../../@core/models/CheckList";
import { LayoutService } from "../../../@core/utils";
import { UserApiService } from "../../../@core/api/user.resource.service";
import { ShopApiService } from "../../../@core/api/shop.resource.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import {
  CheckListItem,
  CHECK_LIST_ITEM_STATUS_APPROVED,
  CHECK_LIST_ITEM_STATUS_PENDING,
  WIDGET_TYPES,
} from "../../../@core/models/CheckListItem";
import { File } from "../../../@core/models/File";

@Component({
  selector: "batiste-check-list-checkup",
  templateUrl: "./checkup.component.html",
})
export class CheckListCheckupComponent implements OnInit {
  checkList: CheckList = new CheckList();
  form: FormGroup = new FormGroup({});
  widgetTypes = [...WIDGET_TYPES];

  constructor(
    protected checkListApi: CheckListApiService,
    protected ls: LayoutService,
    protected formBuilder: FormBuilder,
    protected shopApi: ShopApiService,
    protected userApi: UserApiService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      id: new FormControl(""),
      checkListItems: this.formBuilder.array([]),
    });
  }

  onSubmit() {
    this.checkListApi.checkup(this.checkList, this.form.value).subscribe(() => {
      this.router.navigate(["/check-lists/by-worker/list"]);
    });
  }

  ngOnInit(): void {
    this.ls.layoutTitle = "Edit checkList";
    this.ls.hasBack = true;
    this.route.data.subscribe((data: { checkList: CheckList }) => {
      this.checkList = data.checkList;
      this.checkList.checkListItems.forEach((checkListItem) => {
        this.addCheckListItem(checkListItem);
      });
      this.form.patchValue(data.checkList);
    });
  }

  setFiles(checkListItem: CheckListItem) {
    let arr = new FormArray([]);
    checkListItem.files.forEach((file) => {
      arr.push(
        this.formBuilder.group({
          id: file.id,
        })
      );
    });
    return arr;
  }
  
  addCheckListItem(checkListItem: CheckListItem = null) {
    const checkListItemForm = this.formBuilder.group({
      id: ["", Validators.required],
      workerCheckup: ["", Validators.required],
      status: [CHECK_LIST_ITEM_STATUS_PENDING],
      files: checkListItem?this.setFiles(checkListItem):new FormArray([]),
    });

    this.checkListItems.push(checkListItemForm);
  }

  get checkListItems() {
    return this.form.controls["checkListItems"] as FormArray;
  }


  get files() {
    return this.checkListItems.get('files') as FormArray;
  }

  isApprovable() {
    return this.checkList.isApprovable();
  }

  onSelectFile(file: File, control, index: number) {
    control.push(
      this.formBuilder.group({
        id: [file.id]
      }
    ))
    if (!this.checkList.checkListItems[index].files) {
      this.checkList.checkListItems[index].files = [];
    }
    this.checkList.checkListItems[index].files.push(file);
  }

  approveCheckListItem(index) {
    this.checkListItems.controls[index].patchValue({
      status: CHECK_LIST_ITEM_STATUS_APPROVED,
    });
    this.checkList.checkListItems[index].status =
      CHECK_LIST_ITEM_STATUS_APPROVED;
  }
}
