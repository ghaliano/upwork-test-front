import { NgModule } from "@angular/core";

import { CheckListRoutingModule } from "./check-list-routing.module";
import { CheckListCreateComponent } from "./create-edit/create.component";
import { CheckListListComponent } from "./list/list.component";
import { CheckListComponent } from "./check-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckListEditComponent } from "./create-edit/edit.component";
import { ThemeModule } from "../../@theme/theme.module";
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
} from "@nebular/theme";
import { CheckListWorkerListComponent } from "./worker-list/list.component";
import { CheckListCheckupComponent } from "./checkup/checkup.component";
import { CheckListShowComponent } from "./show/show.component";
import { FileModule } from '../file/file.module';


@NgModule({
  declarations: [
    CheckListCreateComponent,
    CheckListComponent,
    CheckListEditComponent,
    CheckListListComponent,
    CheckListWorkerListComponent,
    CheckListCheckupComponent,
    CheckListShowComponent
  ],
  imports: [
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbSpinnerModule,
    NbSelectModule,
    CheckListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,
    FileModule
  ],
  entryComponents: [CheckListComponent],
  exports: [],
  providers: [],
})
export class CheckListModule {}
