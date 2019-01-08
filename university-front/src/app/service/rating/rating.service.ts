import {Injectable} from '@angular/core';
import {AbstractCrudService} from "../abstract.crud.service";
import {HttpClient} from "@angular/common/http";
import {RatingDto} from "../../dto/rating.dto";

@Injectable({
  providedIn: 'root'
})
export class RatingService extends AbstractCrudService <RatingDto> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getPath(): string {
    return "/api/rating";
  }
}
