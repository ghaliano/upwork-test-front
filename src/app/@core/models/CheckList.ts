import { EntityResourceInterface, ResourceConfigInterface } from '../api/entity.resource.service';
import { CheckListItem, CHECK_LIST_ITEM_STATUS_APPROVED, CHECK_LIST_ITEM_STATUS_PENDING } from './CheckListItem';
import { Shop } from './Shop';
import { User } from './User';

export const CHECK_LIST_STATUS_APPROVED = 'approved';
export const CHECK_LIST_STATUS_PENDING = 'pending';

export const CHECK_LIST_STATUS: any = [
  {
    key: CHECK_LIST_STATUS_APPROVED,
    label: 'Approved',
    cssClass: 'status-approved',
    iconName: 'flash-outline'
  },
  {
    key: CHECK_LIST_STATUS_PENDING,
    label: 'Pending',
    cssClass: 'status-pending',
    iconName: 'flash-off-outline'
  }
];
export class CheckList implements EntityResourceInterface{
  constructor(id?: number){
    this.id = id;
  }
  resourceName: string = 'CheckList';
  resourceLabel: string = 'CheckList';
  id?:number;
  name?: string;
  userId: number;
  user: User;
  workerId: number;
  worker: User;
  shop: Shop;
  shopId: number;
  checkListItems: CheckListItem[];
  createdAt: Date;
  status:string;
  
  getCollectionResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/check-lists'
    }; 
  }

  getItemResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/check-lists/' + this.id
    };
  }

  getSlug(){
    return this.resourceName + "-" + this.id;
  }

  __toString(){
    return this.name;
  }

  getStatusCssClass() {
    const theStatus = CHECK_LIST_STATUS.find(
      (status: any) => status.key == this.status,
    );

    return theStatus ? theStatus.cssClass : '';
  }

  getStatusIconName() {
    const theStatus = CHECK_LIST_STATUS.find(
      (status: any) => status.key == this.status,
    );

    return theStatus ? theStatus.iconName : '';
  }

  getStatusLabel() {
    const theStatus = CHECK_LIST_STATUS.find(
      (status: any) => status.key == this.status,
    );

    return theStatus ? theStatus.label : '';
  }

  isApprovable(){
    return this.checkListItems.findIndex(cl => cl.status == CHECK_LIST_ITEM_STATUS_PENDING) === -1
  }

  isPending(){return this.status === CHECK_LIST_STATUS_PENDING;}
  isApproved(){return this.status === CHECK_LIST_STATUS_APPROVED;}
}