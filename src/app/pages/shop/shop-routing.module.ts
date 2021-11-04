import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopCreateComponent } from './create-edit/create.component';
import { ShopEditComponent } from './create-edit/edit.component';
import { ShopListComponent } from './list/list.component';
import { ShopComponent } from './shop.component';
import { EntityDetailResolve } from '../../@core/utils/entity-detail-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'create',
        component: ShopCreateComponent,
      },
      {
        path: 'list',
        component: ShopListComponent,
      },
      {
        path: 'edit/:id',
        component: ShopEditComponent,
        resolve: { shop: EntityDetailResolve}
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
