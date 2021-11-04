import { EntityResourceInterface, ResourceConfigInterface } from "../api/entity.resource.service";
import { File } from "./File";
export const ROLE_WORKER = 'role_worker';
export const ROLE_ADMIN = 'role_admin';

export class User implements EntityResourceInterface{
  constructor(id?: number){
    this.id = id;
  }
  resourceName: string = 'User';
  resourceLabel: string = 'User';
  id?:number;
  email?:string;
  fullName?:string;
  isEnabled:boolean;
  password?:string;
  phone:string;
  role:string;
  profileImage?: File;
  profileImageId?: number;
  createdAt: Date;

  getCollectionResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/users'
    };
  }

  getItemResourceConfig(): ResourceConfigInterface {
    return {
      uri: '/users/' + this.id
    };
  }

  getSlug(){
    return this.resourceName + "-" + this.id;
  }

  __toString(){
    return this.fullName;
  }

  getDashboardMenuByRole(){
  }
}


export interface UserFilter{
  term?:string;
  roles?: string[];
}