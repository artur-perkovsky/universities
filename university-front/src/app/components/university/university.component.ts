import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UniversityService} from "../../service/university/university.service";
import {UniversityDto} from "../../dto/university.dto";
import {merge, of as observableOf} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator} from "@angular/material";
import {DeleteButtonComponent} from "../delete-button/delete-button.component";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {BaseDto} from "../../dto/base.dto";
import {CityService} from "../../service/city/city.service";
import {CountryService} from "../../service/country/country.service";

export interface DialogData {
  animal: string;
  name: string;
}

const all: BaseDto = {id: null, name: 'All'};

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  animal: string;
  name: string;

  value: string;

  selectedAge: BaseDto = all;
  selectedCity: BaseDto = all;
  selectedCountry: BaseDto = all;

  allAge: BaseDto [] = [all];
  cities: BaseDto [] = [all];
  countries: BaseDto [] = [all];

  displayedColumns: string[] = ['id', 'name', 'age', 'city', 'country', ' ',];

  universities: UniversityDto [] = [];

  pageSize = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: UniversityService,
              private cityService: CityService,
              private countryService: CountryService) {
  }

  initSelectors() {
    this.cityService.getAll().subscribe(result => {
      this.cities = result.map(result => new BaseDto(result.id, result.name));
      this.cities.unshift(all);
    });

    this.countryService.getAll().subscribe(result => {
      this.countries = result.map(result => new BaseDto(result.id, result.name));
      this.countries.unshift(all);
    });
  }

  createSearchParams(): string {

    let result = '?';

    if (this.selectedAge.id != null) {
      result = result + `age=${this.selectedAge.id}&`;
    }

    if (this.selectedCity.id != null) {
      result = result + `city=${this.selectedCity.id}&`;
    }

    if (this.selectedCountry.id != null) {
      result = result + `country=${this.selectedCountry.id}&`;
    }

    return result;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogUniversity, {
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

  selectorChangedAge(element: BaseDto) {
    this.selectedAge = element;
    this.paginator.pageIndex = 0;
    this.updateTable();
  }

  selectorChangedCity(element: BaseDto) {
    this.selectedCity = element;
    this.paginator.pageIndex = 0;
    this.updateTable();
  }

  selectorChangedCountry(element: BaseDto) {
    this.selectedCountry = element;
    this.paginator.pageIndex = 0;
    this.updateTable();
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
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;
          this.pageSize = data.size;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.universities = data);
  }

  ngOnInit() {
    this.initSelectors();
    this.updateTable()
  }


}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogOverviewDialogUniversity {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogUniversity>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}





