import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseCreateComponent } from './create-edit/create.component';
import { ExpenseEditComponent } from './create-edit/edit.component';
import { ExpenseListComponent } from './list/list.component';
import { ExpenseComponent } from './expense.component';
import { EntityDetailResolve } from '../../@core/utils/entity-detail-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: ExpenseComponent,
    children: [
      {
        path: 'create',
        component: ExpenseCreateComponent,
      },
      {
        path: 'list',
        component: ExpenseListComponent,
      },
      {
        path: 'edit/:id',
        component: ExpenseEditComponent,
        resolve: { expense: EntityDetailResolve}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseRoutingModule {}
