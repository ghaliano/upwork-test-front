import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckListApiService } from '../../../@core/api/check-list.resource.service';
import { LayoutService } from '../../../@core/utils';
import { CheckList } from '../../../@core/models/CheckList';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'batiste-checkList-list',
  templateUrl: './list.component.html'
})
export class CheckListListComponent implements OnInit {
  checkLists:CheckList[] = [];
  isLoading: boolean = false;
  
  dialogRef: NbDialogRef<any>;
  constructor(
    private route:ActivatedRoute,
    private checkListApi: CheckListApiService,
    protected dialogService: NbDialogService,
    protected ls: LayoutService) { }

  ngOnInit(): void {
    this.ls.layoutTitle = "Check Lists";
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



  removeCheckList (checkList) {
    if (confirm("Confirmer la suppression")){
      this.checkListApi.delete(checkList).subscribe(()=>{
        this.checkLists.splice(this.checkLists.findIndex(q=>q.id==checkList.id), 1);
      });
    }
  }

  showStat(){

  }

  exportCheckupPdf (checkList: CheckList) {
    this.checkListApi.generateCheckupPdf(checkList);
  }

  openDialog(dialog: TemplateRef<any>) {
    this.dialogRef = this.dialogService.open(dialog, {
      context: null,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}