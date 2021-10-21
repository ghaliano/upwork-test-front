import { NgModule } from '@angular/core';

import { ExpenseRoutingModule } from './expense-routing.module';
import { ExpenseCreateComponent } from './create-edit/create.component';
import { ExpenseListComponent } from './list/list.component';
import { ExpenseComponent } from './expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseEditComponent } from './create-edit/edit.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';

@NgModule({
  declarations: [ExpenseCreateComponent, ExpenseComponent, ExpenseEditComponent, ExpenseListComponent],
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    ExpenseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule
  ],
  entryComponents: [ExpenseComponent],
  exports: [],
  providers: []
})
export class ExpenseModule { }
