import {Component, Inject, OnInit} from '@angular/core';
import {CityService} from "../../service/city/city.service";
import {CityDto} from "../../dto/city.dto";
import { MatDialog } from "@angular/material";
import { DialogOverviewExampleDialog, DialogOverviewExampleDialogDell } from "../university/university.component";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  animal: string;
  name: string;


  displayedColumns: string[] = ['id', 'name', 'country', ' '];

  cities: CityDto [];

  constructor(public dialog: MatDialog, public dialogDell: MatDialog, private service: CityService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogDell(): void {
    const dialogRefDell = this.dialogDell.open(DialogOverviewExampleDialogDell, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRefDell.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe(all => this.cities = all);
  }
}
