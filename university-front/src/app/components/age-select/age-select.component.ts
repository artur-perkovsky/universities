import { Component, OnInit } from '@angular/core';
import { UniversityDto } from "../../dto/university.dto";
import { UniversityService } from "../../service/university/university.service";


@Component({
  selector: 'app-age-select',
  templateUrl: './age-select.component.html',
  styleUrls: ['./age-select.component.css']
})
export class AgeSelectComponent implements OnInit {
  age: UniversityDto [] = [];

  constructor(private service: UniversityService) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe(all => this.age = all);
  }
}
