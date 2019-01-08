import {BaseDto} from "../dto/base.dto";
import {Observable} from "rxjs";

export interface CrudService<T extends BaseDto> {

  getAll(): Observable<T []>;

  byId(id: number): Observable<T>;

  delete(id: number): void;
}
