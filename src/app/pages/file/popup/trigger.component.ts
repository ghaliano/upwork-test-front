import { Component, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import {
  NbDialogRef,
  NbDialogService,
  NbToastRef,
  NbToastrService,
} from '@nebular/theme';
import { File as FileEntity, PROFILE_IMAGE_TYPE } from '../../../@core/models/File';
import { EventEmitter } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FileApiService } from '../../../@core/api/file.resource.service';
import { TrackerService } from '../../../@core/utils/tracker.service';

@Component({
  selector: 'batiste-file-popup-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.scss'],
})
export class FilePopupTriggerComponent implements OnInit {
  files: FileEntity[] = [];
  dialogRef: NbDialogRef<any>;
  toastRef:NbToastRef;
  @Input() multiple: boolean = false;
  //Automatic
  @Input() auto: boolean = false;
  @Input() selectedFiles: FileEntity[] = [];
  @Output() onSelectFiles: EventEmitter<
    FileEntity[] | FileEntity
  > = new EventEmitter();
  @Output() onRemoveFile: EventEmitter<
    FileEntity[] | FileEntity
  > = new EventEmitter();

  @Input() config: any = {
    trigger_label: 'Upload',
    type: PROFILE_IMAGE_TYPE,
    refresh: true,
    params: {},
  };
  isUploading: boolean = false;
  url: string;
  urlStatus: string = 'success';
  inputId:string;

  constructor(
    protected router: Router,
    protected fileApi: FileApiService,
    private dialogService: NbDialogService,
    public tracker: TrackerService
  ) {
    this.inputId = Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  ngOnInit(): void {}

  fetchFiles() {
    this.fileApi
      .findAll(new FileEntity(), this.config.params)
      .subscribe((files: FileEntity[]) => {
        this.files = files;
      });
  }

  openFileModal(dialog: TemplateRef<any>) {
    this.fetchFiles();
    if (!this.auto) {
      this.dialogRef = this.dialogService.open(dialog, {
        context: null,
      });
    }
  }

  uploadFiles(files) {
    let temp: FileEntity[] = [];

    this.fileApi
      .uploadFiles({ files: files, type: this.config.type })
      .pipe(catchError(err => {
          return throwError(err);
      }))
      .subscribe((event: HttpEvent<any>) => {
        this.tracker.start();
        switch (event.type) {
          case HttpEventType.UploadProgress:
          this.tracker.progress = Math.round((event.loaded / event.total) * 100);
            break;
          case HttpEventType.Response:
            this.tracker.stop();
            let res: FileEntity[] = event.body;
            for (let i in res) {
              if (res[i] instanceof FileEntity) {
                res[i].checked = true;
                this.files.push(res[i]);
                temp.push(res[i]);
              }
            }
            if (this.auto && temp.length) {
              this.onSelectFiles.emit(this.multiple ? temp : temp[0]);
            }
        }
      }, () => {
        this.tracker.stop();
      });
  }

  onSelect() {
    let files: FileEntity[] = this.files.filter((file) => file.checked);
    this.onSelectFiles.emit(this.multiple ? files : files[0]);
    this.closeModal();
  }

  toggleFileCheckedChange(thefile: FileEntity) {
    if (!this.multiple) {
      this.files.forEach((file) => {
        if (thefile.id != file.id) {
          file.checked = false;
        }
      });
    }
    thefile.checked = !thefile.checked;
  }
  
  getSelectedFile() {
    return this.files.filter((file) => file.checked);
  }

  isValid() {
    return this.files.filter((file) => file.checked).length;
  }

  closeModal() {
    this.dialogRef.close();
  }

  async uploadByUrl() {
    try {
      let response = await fetch(this.url);

      if (response.ok) {
        let data = await response.blob();
        this.urlStatus = 'success';
        let metadata = {
          type: 'image/jpeg',
        };
        let file = new File([data], 'test.jpg', metadata);

        this.uploadFiles([file]);
      } else {
        this.urlStatus = 'danger';
      }
    } catch (e) {
      this.urlStatus = 'danger';
    }
  }

  removeFile(file: FileEntity) {
    if (confirm('Confirmer la suppression')) {
      this.fileApi.delete(file).subscribe(() => {
        this.files.splice(
          this.files.findIndex((f) => f.id == file.id),
          1,
        );
        this.onRemoveFile.emit(file);
      });
    }
  }
}
