import {BaseDto} from "./base.dto";

export class UniversityDto extends BaseDto {
  name: string;
  age: number;
  city: BaseDto;
  country: BaseDto;
  specialities: BaseDto [];
  rating: number;
}
