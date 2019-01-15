import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { UniversityService } from "../../service/university/university.service";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonUniversityComponent {

  constructor(private service: UniversityService,
              public dialogRef: MatDialogRef<DeleteButtonUniversityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.service.delete(this.data.id);
  }

}



