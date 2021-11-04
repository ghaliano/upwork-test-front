import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckListApiService } from '../../../@core/api/check-list.resource.service';
import { LayoutService } from '../../../@core/utils';
import { CheckList } from '../../../@core/models/CheckList';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'batiste-check-list-worker-list',
  templateUrl: './list.component.html'
})
export class CheckListWorkerListComponent implements OnInit {
  checkLists:CheckList[] = [];
  isLoading: boolean = false;
  
  dialogRef: NbDialogRef<any>;
  constructor(
    private checkListApi: CheckListApiService,
    protected dialogService: NbDialogService,
    protected ls: LayoutService) { }

  ngOnInit(): void {
    this.ls.layoutTitle = "My check lists";
    this.ls.hasBack = true;
    this.fetchCheckLists();
  }

  fetchCheckLists (filter= {}) {
    this.isLoading = true;
    this.checkListApi.findAll(new CheckList, filter).subscribe((checkLists: CheckList[])=>{
      this.checkLists = checkLists;
      this.isLoading = false;
    });
  }

  filterCheckList($event){
    this.fetchCheckLists($event.target.value?{term:$event.target.value}:{});
  }
}