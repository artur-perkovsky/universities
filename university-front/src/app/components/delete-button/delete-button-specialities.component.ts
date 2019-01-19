import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SpecialtyService} from "../../service/specialty/specialty.service";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonSpecialitiesComponent {

  needUpdate: boolean = false;

  constructor(private service: SpecialtyService,
              public dialogRef: MatDialogRef<DeleteButtonSpecialitiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.needUpdate = true;

    this.service.delete(this.data.id).subscribe(result => {
      this.dialogRef.close()
    });
  }
}
