import { EntityResourceInterface, ResourceConfigInterface } from '../api/entity.resource.service';
import { User } from './User';

export class Expense implements EntityResourceInterface{
  constructor(id?: number){
    this.id = id;
  }
  resourceName: string = 'Expense';
  resourceLabel: string = 'Expense';
  id?:number;
  description?: string;
  amount: number;
  note:string;
  userId: number;
  user: User;
  
  getCollectionResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/expenses'
    }; 
  }

  getItemResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/expenses/' + this.id
    };
  }

  getSlug(){
    return this.resourceName + "-" + this.id;
  }

  __toString(){
    return this.description;
  }
}