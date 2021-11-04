import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckListCreateComponent } from './create-edit/create.component';
import { CheckListEditComponent } from './create-edit/edit.component';
import { CheckListListComponent } from './list/list.component';
import { CheckListComponent } from './check-list.component';
import { EntityDetailResolve } from '../../@core/utils/entity-detail-resolve.service';
import { CheckListWorkerListComponent } from './worker-list/list.component';
import { CheckListCheckupComponent } from './checkup/checkup.component';
import { CheckListShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: '',
    component: CheckListComponent,
    children: [
      {
        path: 'create',
        component: CheckListCreateComponent,
      },
      {
        path: 'list',
        component: CheckListListComponent,
      },
      {
        path: 'edit/:id',
        component: CheckListEditComponent,
        resolve: { checkList: EntityDetailResolve}
      },
      {
        path: 'by-worker/list',
        component: CheckListWorkerListComponent
      },
      {
        path: 'checkup/:id',
        component: CheckListCheckupComponent,
        resolve: { checkList: EntityDetailResolve}
      },
      {
        path: 'show/:id',
        component: CheckListShowComponent,
        resolve: { checkList: EntityDetailResolve}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckListRoutingModule {}
