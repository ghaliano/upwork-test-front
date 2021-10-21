import { EntityResourceInterface, ResourceConfigInterface } from "../api/entity.resource.service";

export class User implements EntityResourceInterface{
  constructor(id?: number){
    this.id = id;
  }
  resourceName: string = 'User';
  resourceLabel: string = 'User';
  id?:number;
  email?:string;
  fullName?:string;
  password?:string;

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
}
