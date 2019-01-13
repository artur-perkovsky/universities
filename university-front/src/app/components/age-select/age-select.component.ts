import { Component, OnInit } from '@angular/core';

export interface selectAge {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-age-select',
  templateUrl: './age-select.component.html',
  styleUrls: ['./age-select.component.css']
})
export class AgeSelectComponent implements OnInit {
  age: selectAge[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
