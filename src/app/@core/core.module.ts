import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbAuthService } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthService } from './utils/auth.service';
import { RoleProvider } from './utils/role.provider';
import { authSettings, securitySettings } from './utils/security.settings';
import { EntityDetailResolve } from './utils/entity-detail-resolve.service';
import { EntityResourceService } from './api/entity.resource.service';
import { UserApiService } from './api/user.resource.service';
import { ExpenseApiService } from './api/expense.resource.service';
import { LayoutService } from './utils';


export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot(authSettings).providers,
  NbSecurityModule.forRoot(securitySettings).providers,
  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  {
    provide: NbAuthService, useClass: AuthService
  }
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    EntityResourceService,
    UserApiService,
    ExpenseApiService,
    EntityDetailResolve,
    LayoutService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
