import { Component, Inject, OnInit } from '@angular/core';
import { CityService } from "../../service/city/city.service";
import { CityDto } from "../../dto/city.dto";

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { DeleteButtonCityComponent } from "../delete-button/delete-button-city.component";


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

  constructor(public dialog: MatDialog, private service: CityService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogCity, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogDell(id: number): void {

    const dialogRefDell = this.dialog.open(DeleteButtonCityComponent, {
      width: '250px',
      data: {id: id}

    });

    dialogRefDell.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
        this.service.getAll().subscribe(all => this.cities = all);
    });
  }


  ngOnInit() {
    this.getAll();
  }

  getAll(): void {
    this.service.getAll().subscribe(all => this.cities = all);
  }
}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogOverviewDialogCity {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogCity>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
