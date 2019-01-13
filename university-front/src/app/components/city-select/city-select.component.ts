import { Component, OnInit } from '@angular/core';

export interface selectCity {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.css']
})

export class CitySelectComponent implements OnInit {
  cities: selectCity[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
