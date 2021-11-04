import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ThemeModule,
    NbIconModule,
    NbFormFieldModule,
    NbInputModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    NbLayoutModule,
  ],
  declarations: [
    LoginComponent,
    AuthComponent,

  ]
})
export class AuthModule {
}