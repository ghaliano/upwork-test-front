import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../../../@core/api/user.resource.service';
import { File, PROFILE_IMAGE_TYPE as FILE_TYPE } from '../../../@core/models/File';
import { ROLE_WORKER, User } from '../../../@core/models/User';

export abstract class WorkerFormComponent{
  form: FormGroup = new FormGroup({});
  worker:User = new User();
  PROFILE_IMAGE_TYPE:string = FILE_TYPE;

  constructor(
    protected userApi: UserApiService,
    protected router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(),
      fullName: new FormControl(),
      isEnabled: new FormControl(true),
      password: new FormControl(),
      phone: new FormControl(),
      role: new FormControl(ROLE_WORKER),
      profileImageId: new FormControl()
    });
  }

  onSelectLogo(file: File){
    this.worker.profileImageId = file.id;
    this.form.patchValue({profileImageId: file.id});
    this.worker.profileImage = file;
  }

  removeLogo(){
    this.worker.profileImageId = null;
    this.form.patchValue({profileImageId: null});
    delete this.worker.profileImage ;
  }
}
