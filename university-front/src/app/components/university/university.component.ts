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
import {SpecialtyService} from "../../service/specialty/specialty.service";

export interface DialogData {
  name: string;
}

const all: BaseDto = {id: null, name: 'All'};

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {

  selectedCity: number;
  selectedCountry: number;
  selectedSpeciality: number;
  rating: number;
  age: number;

  cities: BaseDto [] = [all];
  countries: BaseDto [] = [all];
  specialities: BaseDto [] = [all];

  displayedColumns: string[] = ['name', 'age', 'city', 'country', 'specialities', 'rating', ' ',];

  universities: UniversityDto [] = [];

  pageSize = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: UniversityService,
              private cityService: CityService,
              private countryService: CountryService,
              private specialityService: SpecialtyService) {
  }

  initSelectors() {
    this.selectedCity = null;
    this.selectedCountry = null;
    this.selectedSpeciality = null;
    this.age = null;
    this.rating = null;

    this.cities = [all];
    this.countries = [all];
    this.specialities = [all];

    this.countryService.getAll().subscribe(result => {
      this.countries = result.map(result => new BaseDto(result.id, result.name));
      this.countries.unshift(all);
    });

    this.specialityService.getAll().subscribe(result => {
      this.specialities = result.map(result => new BaseDto(result.id, result.name));
      this.specialities.unshift(all);
    });
  }

  createSearchParams(): string {

    let result = '?';

    if (this.age != null) {
      result = result + `age=${this.age}&`;
    }

    if (this.selectedCity != null) {
      result = result + `city=${this.selectedCity}&`;
    }

    if (this.selectedCountry != null) {
      result = result + `country=${this.selectedCountry}&`;
    }

    if (this.selectedSpeciality != null) {
      result = result + `specialty=${this.selectedSpeciality}&`;
    }

    if (this.rating != null) {
      result = result + `rating=${this.rating}&`;
    }

    return result;
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogUniversity, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(id: number): void {
    const dialogRefDell = this.dialog.open(DeleteButtonUniversityComponent, {
      width: '250px',
      data: {id: id}
    });

    dialogRefDell.afterClosed().subscribe(result => {
      if (dialogRefDell.componentInstance.needUpdate) {
        this.paginator.pageIndex = 0;
        this.updateTable();
      }
    });
  }

  selectorChangedCountry(newValue) {
    this.selectedCountry = newValue;

    this.paginator.pageIndex = 0;

    if (this.selectedCountry == null) {
      this.cities = [all];
      this.selectedCity = newValue;
      return;
    }

    this.cityService.getAllByCountry(this.selectedCountry).subscribe(result => {
      this.cities = result.map(result => new BaseDto(result.id, result.name));
      this.cities.unshift(all);
      this.selectedCity = null;
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
      ).subscribe(data => this.universities = data);
  }

  ngOnInit() {
    this.initSelectors();
    this.updateTable()
  }

  filter() {
    this.paginator.pageIndex = 0;
    this.updateTable()
  }

  resetFilter() {
    this.initSelectors();
    this.updateTable();
  }

  refresh() {
    this.updateTable();
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





