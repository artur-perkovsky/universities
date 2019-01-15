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
    {value: 'steak-0', viewValue: '33'},
    {value: 'pizza-1', viewValue: '45'},
    {value: 'tacos-2', viewValue: '1'},
    {value: 'tacos-2', viewValue: '50'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
