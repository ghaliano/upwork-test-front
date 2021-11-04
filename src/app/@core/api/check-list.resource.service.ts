import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CheckList, CHECK_LIST_STATUS_APPROVED } from '../models/CheckList';
import { FileSaverService } from 'ngx-filesaver';
import {
  EntityResourceService, ResourceConfigInterface,
} from './entity.resource.service';
import { HttpClient } from '@angular/common/http';
import { NbTokenStorage } from '@nebular/auth';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class CheckListApiService extends EntityResourceService {
  constructor(
    protected fileSaver: FileSaverService,
    protected http: HttpClient,
    protected tokenStorage: NbTokenStorage,
    protected toastr: NbToastrService,
  ) {
    super(http, tokenStorage, toastr);
  }

  checkup(checkList: CheckList, dto){
    dto.status = CHECK_LIST_STATUS_APPROVED;
    const config: ResourceConfigInterface = checkList.getItemResourceConfig();
    
    return this.update(checkList, dto, null, environment.backend_api_url + config.uri +  '/checkup');
  }

  generateCheckupPdf(checkList: CheckList) {
    const config: ResourceConfigInterface = checkList.getItemResourceConfig();
    let headers = this.getJwtTokenHedaer();
    headers.responseType = 'blob';

    return this.http
      .get(environment.backend_api_url + config.uri + '/export', headers)
      .subscribe((res) => {
        this.fileSaver.save((<any>res), checkList.id+'.pdf');
      });
  }
}
