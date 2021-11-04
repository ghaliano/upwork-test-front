import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkerCreateComponent } from './create-edit/create.component';
import { WorkerEditComponent } from './create-edit/edit.component';
import { WorkerListComponent } from './list/list.component';
import { WorkerComponent } from './worker.component';
import { EntityDetailResolve } from '../../@core/utils/entity-detail-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: WorkerComponent,
    children: [
      {
        path: 'create',
        component: WorkerCreateComponent,
      },
      {
        path: 'list',
        component: WorkerListComponent,
      },
      {
        path: 'edit/:id',
        component: WorkerEditComponent,
        resolve: { worker: EntityDetailResolve}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerRoutingModule {}
