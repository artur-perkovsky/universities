import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator} from "@angular/material";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {CreateCountryDialog} from "../country/country.component";
import {SpecialtyDto} from "../../dto/specialty.dto";
import {SpecialtyService} from "../../service/specialty/specialty.service";
import {DeleteButtonSpecialitiesComponent} from "../delete-button/delete-button-specialities.component";
import {CountryDto} from "../../dto/country.dto";

@Component({
  selector: 'app-specialities',
  templateUrl: './specialities.component.html',
  styleUrls: ['./specialities.component.css']
})
export class SpecialitiesComponent implements OnInit {

  pageSize = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', ' '];

  specialities: SpecialtyDto [];

  constructor(public dialog: MatDialog, private service: SpecialtyService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateSpecialtyDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.paginator.pageIndex = 0;
      this.updateTable();
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRefDell = this.dialog.open(DeleteButtonSpecialitiesComponent, {
      width: '250px',
      data: {id: id}
    });

    dialogRefDell.afterClosed().subscribe(result => {
      this.paginator.pageIndex = 0;
      this.updateTable();
    });
  }

  ngOnInit() {
    this.updateTable();
  }

  createSearchParams(): string {

    let result = '?';

    return result;
  }

  updateTable() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service!.list(this.createSearchParams(),
            this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;
          this.pageSize = data.size;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.specialities = data);
  }
}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog.component.html',
})
export class CreateSpecialtyDialog {

  specialtyDto: SpecialtyDto = new CountryDto(null, null);

  constructor(
    public dialogRef: MatDialogRef<CreateCountryDialog>,
    private service: SpecialtyService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.service.save(this.specialtyDto).subscribe(result => {
      this.dialogRef.close()
    });
  }
}
