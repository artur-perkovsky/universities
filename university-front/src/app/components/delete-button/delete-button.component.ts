import { Component, Inject } from '@angular/core';
import { DialogData } from "../university/university.component";

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {

  animal: string;
  name: string;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteButtonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
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
}



