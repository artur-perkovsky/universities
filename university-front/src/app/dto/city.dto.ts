import {BaseDto} from "./base.dto";

export class CityDto extends BaseDto {
  name: string;
  country: BaseDto;
}
