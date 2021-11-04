import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserApiService } from '../../../@core/api/user.resource.service';
import { LayoutService } from '../../../@core/utils';
import { User, UserFilter } from '../../../@core/models/User';
import { NbDialogRef, NbDialogService } from '@nebular/theme';

@Component({
  selector: 'batiste-worker-list',
  templateUrl: './list.component.html'
})
export class WorkerListComponent implements OnInit {
  workers:User[] = [];
  isLoading: boolean = false;
  filter:UserFilter = {};
  
  dialogRef: NbDialogRef<any>;
  constructor(
    private userApi: UserApiService,
    protected dialogService: NbDialogService,
    protected ls: LayoutService) { }

  ngOnInit(): void {
    this.ls.layoutTitle = "Workers list";
    this.ls.hasBack = true;
    this.fetchWorkers();
  }

  fetchWorkers() {
    this.isLoading = true;
    this.userApi.findAllWorkers(this.filter).subscribe((workers: User[])=>{
      this.workers = workers;
      this.isLoading = false;
    });
  }

  filterWorker($event){
    this.filter.term = $event.target.value?$event.target.value :null;
    this.fetchWorkers();
  }

  removeWorker(worker) {
    if (confirm("Confirmer la suppression")){
      this.userApi.delete(worker).subscribe(()=>{
        this.workers.splice(this.workers.findIndex(q=>q.id==worker.id), 1);
      });
    }
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