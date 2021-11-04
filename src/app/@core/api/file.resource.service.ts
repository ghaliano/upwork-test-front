import { Injectable } from "@angular/core";
import { EntityResourceService } from "./entity.resource.service";
import { catchError, map } from "rxjs/operators";
import { File } from "../models/File";
import { environment } from "../../../environments/environment";

@Injectable()
export class FileApiService extends EntityResourceService {
  uploadFiles(dto: any) {
    let entity = new File();
    const myFormData: FormData = new FormData();
    for (let i in dto.files) {
      const file = dto.files[i];
      myFormData.append("files", file);
    }
    myFormData.append("type", dto.type);
    return this.http
      .post(
        environment.backend_api_url +
          entity.getCollectionResourceConfig().uri +
          "/upload",
        myFormData,
        Object.assign(this.getJwtTokenHedaer(), {
          reportProgress: true,
          observe: "events",
        })
      )
      .pipe(
        map((result) => {
          return result ? EntityResourceService.hydrate(entity, result) : null;
        }),
        catchError((err: any) => {
          return this.handleError(err, entity, {
            title: entity.resourceLabel,
            message: "Upload error",
          });
        })
      );
  }
}
