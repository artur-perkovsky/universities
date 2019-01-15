import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { CityService } from "../../service/city/city.service";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonCityComponent {

  constructor(private service: CityService,
    public dialogRef: MatDialogRef<DeleteButtonCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.service.delete(this.data.id);
  }

}



