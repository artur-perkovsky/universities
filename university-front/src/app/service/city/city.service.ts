import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {CityDto} from "../../dto/city.dto";
import {Observable} from "rxjs";
import {UniversityDto} from "../../dto/university.dto";

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

  save(dto: CityDto): Observable<CityDto> {
    return this.httpClient.post<CityDto>(this.getPath() + "/save", dto);
  }

  getPath(): string {
    return "/api/city";
  }
}
