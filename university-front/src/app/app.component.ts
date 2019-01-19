import {Component} from '@angular/core';
import {University} from "./university";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onSelect(university: University): void{
  }
}
