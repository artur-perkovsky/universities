import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../service/country/country.service";
import {CountryDto} from "../../dto/country.dto";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name'];

  country: CountryDto [];

  constructor(private service: CountryService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe(all => this.country = all);
  }

}
