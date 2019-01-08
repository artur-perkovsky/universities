import {Component, OnInit} from '@angular/core';
import {CityService} from "../../service/city/city.service";
import {CityDto} from "../../dto/city.dto";

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'country'];

  cities: CityDto [];

  constructor(private service: CityService) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe(all => this.cities = all);
  }
}
