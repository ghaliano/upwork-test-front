import { NgModule } from '@angular/core';

import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerCreateComponent } from './create-edit/create.component';
import { WorkerListComponent } from './list/list.component';
import { WorkerComponent } from './worker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkerEditComponent } from './create-edit/edit.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule, NbToggleModule } from '@nebular/theme';
import { FileModule } from '../file/file.module';

@NgModule({
  declarations: [WorkerCreateComponent, WorkerComponent, WorkerEditComponent, WorkerListComponent],
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbSelectModule,
    WorkerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbToggleModule,
    FileModule
  ],
  entryComponents: [WorkerComponent],
  exports: [],
  providers: []
})
export class WorkerModule { }
