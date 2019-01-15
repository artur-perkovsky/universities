import {CrudService} from "./crud.service";
import {HttpClient} from "@angular/common/http";
import {BaseDto} from "../dto/base.dto";
import {Observable} from "rxjs";

export abstract class AbstractCrudService<T extends BaseDto> implements CrudService<T> {

  constructor(protected httpClient: HttpClient) {
  }

  byId(id: number): Observable<T> {
    return this.httpClient.get<T>(this.getPath() + "/" + id);
  }

  delete(id: number): void {
    this.httpClient.delete<T>(this.getPath() + "/" + id);
  }

  getAll(): Observable<T []> {
    return this.httpClient.get<T []>(this.getPath() + "/all");
  }

  list(searchParams: string, page: number): Observable<any> {
    const requestUrl = searchParams + `page=${page}`;
    return this.httpClient.get<any>(this.getPath() + "/list" + requestUrl);
  }

  abstract getPath(): string;
}


