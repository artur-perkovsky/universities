import {Component} from '@angular/core';
import {UNIVERSITIES} from "./list-university";
import {University} from "./university";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  universities = UNIVERSITIES;

  selectedUniversity: University;

  onSelect(university: University): void{
    this.selectedUniversity = university;
  }
}
