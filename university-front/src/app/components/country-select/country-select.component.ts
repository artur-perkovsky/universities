import { Component, OnInit } from '@angular/core';
import { CountryDto } from "../../dto/country.dto";
import { CountryService } from "../../service/country/country.service";


@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css']
})
export class CountrySelectComponent implements OnInit {
  countries: CountryDto[] = [];
  constructor(private service: CountryService) {
  }

  ngOnInit() {
    this.getAll();
  }
  getAll(): void {
    this.service.getAll().subscribe(all => this.countries = all);
  }

}
