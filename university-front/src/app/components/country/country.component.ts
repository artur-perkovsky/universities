import {Component, Inject, OnInit} from '@angular/core';
import {CountryService} from "../../service/country/country.service";
import {CountryDto} from "../../dto/country.dto";
import { MatDialog } from "@angular/material";
import { DialogOverviewExampleDialog, DialogOverviewExampleDialogDell } from "../university/university.component";


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
    this.service.getAll().subscribe(all => this.country = all);
  }
}

