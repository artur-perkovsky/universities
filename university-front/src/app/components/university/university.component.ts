import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UniversityService} from "../../service/university/university.service";
import {UniversityDto} from "../../dto/university.dto";
import {merge, of as observableOf} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator} from "@angular/material";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {BaseDto} from "../../dto/base.dto";
import {CityService} from "../../service/city/city.service";
import {CountryService} from "../../service/country/country.service";
import {DeleteButtonUniversityComponent} from "../delete-button/delete-button-university.component";

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

  selectedAge: number;
  selectedCity: number;
  selectedCountry: number;

  allAge: BaseDto [] = [all];
  cities: BaseDto [] = [all];
  countries: BaseDto [] = [all];

  displayedColumns: string[] = ['name', 'age', 'city', 'country', 'specialities', ' ',];

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
    this.countryService.getAll().subscribe(result => {
      this.countries = result.map(result => new BaseDto(result.id, result.name));
      this.countries.unshift(all);
    });
  }

  createSearchParams(): string {

    let result = '?';

    if (this.selectedAge != null) {
      result = result + `age=${this.selectedAge}&`;
    }

    if (this.selectedCity != null) {
      result = result + `city=${this.selectedCity}&`;
    }

    if (this.selectedCountry != null) {
      result = result + `country=${this.selectedCountry}&`;
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

  openDialogDell(id: number): void {
    const dialogRefDell = this.dialog.open(DeleteButtonUniversityComponent, {
      width: '250px',
      data: {id: id}
    });

    dialogRefDell.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.paginator.pageIndex = 0;
      this.updateTable();
    });
  }

  selectorChangedAge() {
    this.paginator.pageIndex = 0;
    this.updateTable();
  }

  selectorChangedCity(newValue) {
    this.selectedCity = newValue;
    this.paginator.pageIndex = 0;
    this.updateTable();
  }

  selectorChangedCountry(newValue) {

    this.selectedCountry = newValue;

    this.paginator.pageIndex = 0;

    if (this.selectedCountry == null) {
      this.cities = [all];
      this.selectorChangedCity(null);
      return;
    }

    this.cityService.getAllByCountry(this.selectedCountry).subscribe(result => {
      this.cities = result.map(result => new BaseDto(result.id, result.name));
      this.cities.unshift(all);
      this.selectedCity = null;

      this.updateTable();
    });
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





