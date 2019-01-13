import { Component, Inject, OnInit } from '@angular/core';
import { UniversityService } from "../../service/university/university.service";
import { UniversityDto } from "../../dto/university.dto";


import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  animal: string;
  name: string;

  value: string;
  viewValue: string;

  displayedColumns: string[] = ['id', 'name', 'age', 'city', 'country', ' ',];

  universities: UniversityDto [] = [];

  constructor(public dialog: MatDialog, public dialogDell: MatDialog, private service: UniversityService) {
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
    this.service.getAll().subscribe(all => this.universities = all);
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-example-dialogDell',
  templateUrl: './dialogDell.component.html',
})
export class DialogOverviewExampleDialogDell {

  constructor(
    public dialogRefDell: MatDialogRef<DialogOverviewExampleDialogDell>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRefDell.close();
  }
}


