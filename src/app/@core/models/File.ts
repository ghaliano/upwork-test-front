import { environment } from '../../../environments/environment';
import {
  EntityResourceInterface,
  ResourceConfigInterface,
} from '../api/entity.resource.service';


export const PROFILE_IMAGE_TYPE = 'profile_image_type';

export interface FileType {
  key: string;
  label: string;
  label_plural: string;
  entity_attr: string;
}

export const FILE_TYPES: FileType[] = [
  {
    key: PROFILE_IMAGE_TYPE,
    label: 'Image du profile',
    label_plural: 'Images du profile',
    entity_attr: 'profileImage',
  },
];


export class File implements EntityResourceInterface {
  resourceName: string = 'File';
  resourceLabel: string = 'Fichier';
  id?: number;
  name?: string;
  filename?: string;
  type?: string;
  createdAt?: Date;
  checked?: boolean = false;
  isImage?: boolean;
  mimetype?: string;
  isEditing:boolean = false;
  isPlaceholder:false;

  constructor(id?: number) {
    this.id = id;
  }
  
  getCollectionResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/files',
    };
  }
  
  isPdf() {
    return this.mimetype == 'application/pdf';
  }
  
  isHandledMimeType() {
    return this.isPdf() || this.isImage ;
  }

  getItemResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/files/' + this.id,
    };
  }

  getSlug() {
    return this.resourceName + '-' + this.id;
  }

  getUrl() {
    return environment.file_base_url + '/' + this.filename;
  }

  getDisplayedName(num: number = 15) {
    if (this.name.length <= num) {
      return this.name;
    }
    return this.name.slice(0, num) + '...';
  }

  getDisplayedType() {
    const type = FILE_TYPES.find((t) => {
      return t.key == this.type;
    });
    return type ? type.label : null;
  }
}
