import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {UniversityDto} from "../../dto/university.dto";

@Injectable({
  providedIn: 'root'
})
export class UniversityService extends AbstractCrudService <UniversityDto> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getPath(): string {
    return "/api/university";
  }
}
