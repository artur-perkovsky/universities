import {CrudService} from "./crud.service";
import {HttpClient} from "@angular/common/http";
import {BaseDto} from "../dto/base.dto";
import {Observable} from "rxjs";
import {SpecialtyDto} from "../dto/specialty.dto";
import {CountryDto} from "../dto/country.dto";

export abstract class AbstractCrudService<T extends BaseDto> implements CrudService<T> {

  constructor(protected httpClient: HttpClient) {
  }

  byId(id: number): Observable<T> {
    return this.httpClient.get<T>(this.getPath() + "/" + id);
  }

  delete(id: number): Observable<any> {
   return this.httpClient.delete(this.getPath() + "/" + id);
  }

  getAll(): Observable<T []> {
    return this.httpClient.get<T []>(this.getPath() + "/all");
  }

  list(searchParams: string, page: number): Observable<any> {
    const requestUrl = searchParams + `page=${page}`;
    return this.httpClient.get<any>(this.getPath() + "/list" + requestUrl);
  }

  save(dto: T): Observable<T> {
    return this.httpClient.post<T>(this.getPath() + "/save", dto);
  }

  abstract getPath(): string;
}


