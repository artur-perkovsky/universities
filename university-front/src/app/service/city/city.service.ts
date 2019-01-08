import { Injectable } from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {CityDto} from "../../dto/city.dto";

@Injectable({
  providedIn: 'root'
})
export class CityService extends AbstractCrudService <CityDto>{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getPath(): string{
    return "/api/city";
  }
}
