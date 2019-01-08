import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {CountryDto} from "../../dto/country.dto";

@Injectable({
  providedIn: 'root'
})
export class CountryService extends AbstractCrudService <CountryDto>{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getPath(): string{
    return "/api/country";
  }
}
