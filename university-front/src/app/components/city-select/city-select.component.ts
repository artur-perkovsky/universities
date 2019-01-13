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
    {value: 'steak-0', viewValue: 'Hrdno'},
    {value: 'pizza-1', viewValue: 'Minsk'},
    {value: 'tacos-2', viewValue: 'Belostok'},
    {value: 'tacos-2', viewValue: 'Moscow'},
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
