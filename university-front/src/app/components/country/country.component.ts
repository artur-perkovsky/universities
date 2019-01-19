import {Component, OnInit, ViewChild} from '@angular/core';
import {CountryService} from "../../service/country/country.service";
import {CountryDto} from "../../dto/country.dto";

import {MatDialog, MatDialogRef, MatPaginator} from "@angular/material";
import {DeleteButtonCountryComponent} from "../delete-button/delete-button-country.component";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  animal: string;
  name: string;

  pageSize = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', ' '];

  country: CountryDto [];

  constructor(public dialog: MatDialog, private service: CountryService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCountryDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.paginator.pageIndex = 0;
      this.updateTable();
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRefDell = this.dialog.open(DeleteButtonCountryComponent, {
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
      ).subscribe(data => this.country = data);
  }
}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog.component.html',
})
export class CreateCountryDialog {

  countryDto: CountryDto = new CountryDto(null, null);

  constructor(
    public dialogRef: MatDialogRef<CreateCountryDialog>,
    private countryService: CountryService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.countryService.save(this.countryDto).subscribe(result => {
      this.dialogRef.close()
    });
  }
}

