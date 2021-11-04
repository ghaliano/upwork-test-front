import { EntityResourceInterface, ResourceConfigInterface } from '../api/entity.resource.service';
import { CheckList } from './CheckList';
import { User } from './User';

export class Shop implements EntityResourceInterface{
  constructor(id?: number){
    this.id = id;
  }
  resourceName: string = 'Shop';
  resourceLabel: string = 'Shop';
  id?:number;
  name?: string;
  userId: number;
  user: User;
  workerId: number;
  worker: User;
  checkLists: CheckList[];
  createdAt: Date;
  
  getCollectionResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/shops'
    }; 
  }

  getItemResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/shops/' + this.id
    };
  }

  getSlug(){
    return this.resourceName + "-" + this.id;
  }

  __toString(){
    return this.name;
  }
}