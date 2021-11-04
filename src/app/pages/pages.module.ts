import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ShopModule } from './shop/shop.module';
import { WorkerModule } from './worker/worker.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule, 
    ShopModule,
    WorkerModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
