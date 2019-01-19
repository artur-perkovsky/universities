import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {UniversityDto} from "../../dto/university.dto";
import {UniversitySaveDto} from "../../components/university/university.save.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniversityService extends AbstractCrudService <UniversityDto> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  save(dto: UniversityDto): Observable<UniversityDto> {
    return this.httpClient.post<UniversityDto>(this.getPath() + "/save", dto);
  }

  getPath(): string {
    return "/api/university";
  }
}
