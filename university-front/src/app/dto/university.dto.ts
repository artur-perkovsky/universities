import {BaseDto} from "./base.dto";

export class UniversityDto extends BaseDto {
  age: number;
  city: BaseDto;
  country: BaseDto;
  specialities: BaseDto [];
  rating: number;


  constructor(id: number, name: string) {
    super(id, name);
  }
}
