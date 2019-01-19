import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {CityDto} from "../../dto/city.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CityService extends AbstractCrudService <CityDto> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getAllByCountry(id: number): Observable<CityDto []> {
    return this.httpClient.get<CityDto []>(this.getPath() + "/search" + "?country=" + id);
  }

  getPath(): string {
    return "/api/city";
  }
}
