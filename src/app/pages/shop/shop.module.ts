import { NgModule } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopCreateComponent } from './create-edit/create.component';
import { ShopListComponent } from './list/list.component';
import { ShopComponent } from './shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopEditComponent } from './create-edit/edit.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';

@NgModule({
  declarations: [ShopCreateComponent, ShopComponent, ShopEditComponent, ShopListComponent],
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbSelectModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule
  ],
  entryComponents: [ShopComponent],
  exports: [],
  providers: []
})
export class ShopModule { }
