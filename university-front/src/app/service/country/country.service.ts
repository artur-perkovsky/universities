import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {CountryDto} from "../../dto/country.dto";
import {CityDto} from "../../dto/city.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryService extends AbstractCrudService <CountryDto>{

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  save(dto: CountryDto): Observable<CountryDto> {
    return this.httpClient.post<CountryDto>(this.getPath() + "/save", dto);
  }

  getPath(): string{
    return "/api/country";
  }
}
