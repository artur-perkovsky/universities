import { Component, OnInit } from '@angular/core';
import { CityDto } from "../../dto/city.dto";
import { CountryService } from "../../service/country/country.service";
import { CityService } from "../../service/city/city.service";


@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css']
})

export class CitySelectComponent implements OnInit {

  cities: CityDto [] = [];

  constructor(private service: CityService) {
  }

  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.service.getAll().subscribe(all => this.cities = all);
  }
}
