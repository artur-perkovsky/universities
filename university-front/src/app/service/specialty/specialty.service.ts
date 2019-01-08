import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {SpecialtyDto} from "../../dto/specialty.dto";

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService extends AbstractCrudService <SpecialtyDto> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getPath(): string {
    return "/api/specialty";
  }
}
