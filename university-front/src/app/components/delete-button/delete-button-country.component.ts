import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CountryService } from "../../service/country/country.service";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonCountryComponent {

  constructor(private service: CountryService,
              public dialogRef: MatDialogRef<DeleteButtonCountryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.service.delete(this.data.id).subscribe(result => {
      this.dialogRef.close()
    });  }

}



