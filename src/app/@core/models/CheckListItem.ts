import { EntityResourceInterface, ResourceConfigInterface } from '../api/entity.resource.service';
import { CheckList } from './CheckList';
import { File } from './File';

export const CHECK_LIST_ITEM_STATUS_APPROVED = 'approved';
export const CHECK_LIST_ITEM_STATUS_PENDING = 'pending';

export const CHECK_LIST_ITEM_STATUS: any = [
  {
    key: CHECK_LIST_ITEM_STATUS_APPROVED,
    label: 'Approved',
    cssClass: 'status-approved',
    iconName: 'flash-outline'
  },
  {
    key: CHECK_LIST_ITEM_STATUS_PENDING,
    label: 'Pending',
    cssClass: 'status-pending',
    iconName: 'flash-off-outline'
  }
];

export const WIDGET_TYPES: {code: string, name: string}[] = [{
  code: 'text',
  name: 'Simple text'
},{
  code: 'textarea',
  name: 'Champs text'
},{
  code: 'boolean',
  name: 'boolean'
}];

export class CheckListItem implements EntityResourceInterface{
  constructor(id?: number){
    this.id = id;
  }
  resourceName: string = 'CheckListItem';
  resourceLabel: string = 'CheckListItem';
  
  id?:number;
  name?: string;
  widgetType:string;
  description: string;
  workerCheckup: string;
  expectedCheckup: string;
  extraNote: string;
  checkupAt: Date;
  checkListId: number;
  checkList: CheckList;
  status:string;
  files:File[];
  
  getCollectionResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/check-list-items'
    }; 
  }

  getItemResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/check-list-items/' + this.id
    };
  }

  getSlug(){
    return this.resourceName + "-" + this.id;
  }

  __toString(){
    return this.name;
  }

  getStatusCssClass() {
    const theStatus = CHECK_LIST_ITEM_STATUS.find(
      (status: any) => status.key == this.status,
    );

    return theStatus ? theStatus.cssClass : '';
  }

  getStatusLabel() {
    const theStatus = CHECK_LIST_ITEM_STATUS.find(
      (status: any) => status.key == this.status,
    );

    return theStatus ? theStatus.label : '';
  }

  getStatusIconName() {
    const theStatus = CHECK_LIST_ITEM_STATUS.find(
      (status: any) => status.key == this.status,
    );

    return theStatus ? theStatus.iconName : '';
  }

  isPending(){return this.status == CHECK_LIST_ITEM_STATUS_PENDING}
  isApproved(){return this.status == CHECK_LIST_ITEM_STATUS_APPROVED}
}