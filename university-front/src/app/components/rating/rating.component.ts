import { Component, OnInit } from '@angular/core';
import { RatingDto } from "../../dto/rating.dto";
import { MatDialog } from "@angular/material";
import { CityService } from "../../service/city/city.service";
import { RatingService } from "../../service/rating/rating.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'country', 'position'];

  rating: RatingDto [];

  constructor(private service: RatingService) {

  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe(all => this.rating = all);
  }
}

