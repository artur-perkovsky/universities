import { Component, OnInit } from '@angular/core';

export interface selectCountry {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css']
})
export class CountrySelectComponent implements OnInit {
  country: selectCountry[] = [
    {value: 'steak-0', viewValue: 'Belarus'},
    {value: 'pizza-1', viewValue: 'Polsa'},
    {value: 'tacos-2', viewValue: 'Moscow'}
  ];
  constructor() {
  }

  ngOnInit() {
  }

}
