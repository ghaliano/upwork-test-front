import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './dashboard/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      component: DashboardComponent,
    },
    {
      path: '404',
      component: NotFoundComponent,
    },
    {
      path: 'shops',
      loadChildren: () => import('./shop/shop.module')
        .then(m => m.ShopModule),
    },
    {
      path: 'workers',
      loadChildren: () => import('./worker/worker.module')
        .then(m => m.WorkerModule),
    },
    {
      path: 'check-lists',
      loadChildren: () => import('./check-list/check-list.module')
        .then(m => m.CheckListModule),
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
