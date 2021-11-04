import { NgModule } from '@angular/core';

import { FileRoutingModule } from './file-routing.module';
import { FormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbSpinnerModule } from '@nebular/theme';
import { FileComponent } from './file.component';
import { FilePopupTriggerComponent } from './popup/trigger.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FileComponent, FilePopupTriggerComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    FileRoutingModule,
    FormsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbIconModule,
    NbSpinnerModule
  ],
  entryComponents: [FileComponent],
  exports: [FilePopupTriggerComponent],
  providers: [],
})
export class FileModule {
  constructor(){
  }
}
