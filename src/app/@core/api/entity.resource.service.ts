import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { User } from '../models/User';
import { NbTokenStorage } from '@nebular/auth';
import { Expense } from '../models/Expense';
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../environments/environment';

@Injectable()
export class EntityResourceService {
  constructor(
    protected http: HttpClient,
    protected tokenStorage: NbTokenStorage,
    protected toastr: NbToastrService,
  ) {}

  findOneBy(entity: EntityResourceInterface, params: object = {}) {
    const config: ResourceConfigInterface = entity.getItemResourceConfig();

    return this.http
      .get(
        environment.backend_api_url + config.uri,
        Object.assign(this.getJwtTokenHedaer(), this.getParamsOption(params)),
      )
      .pipe(
        map((result) => {
          return result ? EntityResourceService.hydrate(entity, result) : null;
        }),
      );
  }

  find(entity: EntityResourceInterface) {
    const config: ResourceConfigInterface = entity.getItemResourceConfig();

    return this.http
      .get(environment.backend_api_url + config.uri, this.getJwtTokenHedaer())
      .pipe(
        map((result) => {
          return result ? EntityResourceService.hydrate(entity, result) : null;
        }),
      );
  }

  findAll(entity: EntityResourceInterface, params: object = {}) {
    const config: ResourceConfigInterface = entity.getCollectionResourceConfig();

    return this.http
      .get(
        environment.backend_api_url + config.uri,
        Object.assign(this.getJwtTokenHedaer(), this.getParamsOption(params)),
      )
      .pipe(
        map((result: any) => {
          return result.length
            ? EntityResourceService.hydrateCollection(entity, result)
            : [];
        }),
      );
  }

  create(
    entity: EntityResourceInterface,
    dto: any = null,
    extraOptions: EntityResourceExtraOptions = null,
  ) {
    const defaulOptions: EntityResourceExtraOptions = {
      toast: {
        success: {
          title: entity.resourceLabel,
          message: 'Success !',
        },
        error: { title: entity.resourceLabel, message: 'Error !' },
      },
    };

    const config: ResourceConfigInterface = entity.getCollectionResourceConfig();
    const options: EntityResourceExtraOptions = this.merge(
      defaulOptions,
      extraOptions,
    );

    return this.http
      .post(
        environment.backend_api_url + config.uri,
        dto ? dto : entity,
        this.getJwtTokenHedaer(),
      )
      .pipe(
        map((result) => {
          this.toastr.success(
            options.toast.success.message,
            options.toast.success.title,
          );

          return result ? EntityResourceService.hydrate(entity, result) : null;
        }),
        catchError((err: any) => {
          return this.handleError(err, entity, options.toast.error);
        }),
      );
  }

  update(
    entity: EntityResourceInterface,
    dto: any = null,
    extraOptions: EntityResourceExtraOptions = null,
  ) {
    const defaulOptions: EntityResourceExtraOptions = {
      toast: {
        success: {
          title: entity.resourceLabel,
          message: 'Success !',
        },
        error: { title: entity.resourceLabel, message: "Error !" },
      },
    };
    const config: ResourceConfigInterface = entity.getItemResourceConfig();
    const options: EntityResourceExtraOptions = this.merge(
      defaulOptions,
      extraOptions,
    );

    return this.http
      .put(
        environment.backend_api_url + config.uri,
        dto ? dto : entity,
        this.getJwtTokenHedaer(),
      )
      .pipe(
        map((result) => {
          this.toastr.success(
            options.toast.success.message,
            options.toast.success.title,
          );

          return result ? EntityResourceService.hydrate(entity, result) : null;
        }),
        catchError((err: any) => {
          return this.handleError(err, entity, options.toast.error);
        }),
      );
  }

  delete(
    entity: EntityResourceInterface,
    extraOptions: EntityResourceExtraOptions = null,
  ) {
    const defaulOptions: EntityResourceExtraOptions = {
      toast: {
        success: {
          title: entity.resourceLabel,
          message: 'Success !',
        },
        error: { title: entity.resourceLabel, message: 'Error !' },
      },
    };
    const config: ResourceConfigInterface = entity.getItemResourceConfig();
    const options: EntityResourceExtraOptions = this.merge(
      defaulOptions,
      extraOptions,
    );

    return this.http
      .delete(
        environment.backend_api_url + config.uri,
        this.getJwtTokenHedaer(),
      )
      .pipe(
        map((result) => {
          this.toastr.success(
            options.toast.success.message,
            options.toast.success.title,
          );

          return result;
        }),
        catchError((err: any) => {
          return this.handleError(err, entity, options.toast.error);
        }),
      );
  }

  protected handleError(err, entity: EntityResourceInterface, config: any) {
    if (err instanceof HttpErrorResponse) {
      if (err.status == 500) {
        this.toastr.danger('Oops!', 'Form errors');
      } else {
        this.toastr.danger('Oops!', 'Unknown error [' + err.status + ']');
      }
    }
    return throwError(err);
  }

  protected getJwtTokenHedaer(): any {
    return { headers: { Authorization: 'Bearer ' + this.tokenStorage.get() } };
  }

  protected getParamsOption(params): { params: HttpParams } {
    return { params: params };
  }

  merge(obj1, obj2) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if (obj2[p].constructor == Object) {
          obj1[p] = this.merge(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        obj1[p] = obj2[p];
      }
    }

    return obj1;
  }

  static hydrateCollection(entity: EntityResourceInterface, collection: any[]) {
    return collection.map((item) => {
      return EntityResourceService.hydrate(entity, item);
    });
  }

  static hydrate(entity: EntityResourceInterface, json: Object) {
    let theEntity = EntityResourceService.createClass(entity.resourceName);

    return Object.assign(
      theEntity,
      JSON.parse(JSON.stringify(json), (key, value) => {
        if (
          value &&
          value['resourceName'] &&
          !Array.isArray(value) &&
          typeof value == 'object'
        ) {
          return Object.assign(
            EntityResourceService.createClass(value['resourceName'], value),
            value,
          );
        }

        return value;
      }),
    );
  }

  static createClass(className: string, value?: any) {
    let theObject: any;

    switch (className) {
      case 'User':
        theObject = new User();
        break;
      case 'Expense':
        theObject = new Expense();
        break;
    }

    return theObject;
  }
}

export interface EntityResourceInterface {
  resourceName: string;

  resourceLabel: string;
  id?: number | string;
  getCollectionResourceConfig(): ResourceConfigInterface;
  getItemResourceConfig(): ResourceConfigInterface;
  getSlug(): string;
}

export interface ResourceConfigInterface {
  uri: string;
  base_url?: string;
  isSecure?: boolean;
}

export interface EntityResourceExtraOptions {
  toast?: {
    error?: EntityResourceToastOption;
    success?: EntityResourceToastOption;
  };
}

export interface EntityResourceToastOption {
  message?: string;
  title?: string;
}
