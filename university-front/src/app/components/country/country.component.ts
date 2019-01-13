import { Component, Inject, OnInit } from '@angular/core';
import { CountryService } from "../../service/country/country.service";
import { CountryDto } from "../../dto/country.dto";

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { DeleteButtonComponent } from "../delete-button/delete-button.component";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  animal: string;
  name: string;


  displayedColumns: string[] = ['id', 'name', ' '];

  country: CountryDto [];

  constructor(public dialog: MatDialog, public dialogDell: MatDialog, private service: CountryService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogCountry, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogDell(): void {
    const dialogRefDell = this.dialog.open(DeleteButtonComponent, {
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
    this.service.getAll().subscribe(all => this.country = all);
  }
}


@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogOverviewDialogCountry {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogCountry>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

