import {Component, OnInit, ViewChild} from '@angular/core';
import {CityService} from "../../service/city/city.service";
import {CityDto} from "../../dto/city.dto";

import {MatDialog, MatDialogRef, MatPaginator} from "@angular/material";
import {DeleteButtonCityComponent} from "../delete-button/delete-button-city.component";
import {merge, of as observableOf} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {BaseDto} from "../../dto/base.dto";
import {CountryService} from "../../service/country/country.service";

const all: BaseDto = {id: null, name: 'All'};

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  countries: BaseDto [] = [all];
  selectedCountry: number;

  pageSize = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  displayedColumns: string[] = ['name', 'country', ' '];

  cities: CityDto [];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog,
              private countryService: CountryService,
              private service: CityService) {
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogCity, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.paginator.pageIndex = 0;
      this.updateTable();
    });
  }

  openDeleteDialog(id: number): void {

    const dialogRefDell = this.dialog.open(DeleteButtonCityComponent, {
      width: '250px',
      data: {id: id}
    });

    dialogRefDell.afterClosed().subscribe(result => {
      this.paginator.pageIndex = 0;
      this.updateTable();
    });
  }

  initSelectors() {
    this.selectedCountry = null;
    this.countries = [all];

    this.countryService.getAll().subscribe(result => {
      this.countries = result.map(result => new BaseDto(result.id, result.name));
      this.countries.unshift();
    });
  }

  ngOnInit() {
    this.initSelectors();
    this.updateTable()
  }


  createSearchParams(): string {

    let result = '?';

    if (this.selectedCountry != null) {
      result = result + `country=${this.selectedCountry}&`;
    }

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
      ).subscribe(data => this.cities = data);
  }

  filter() {
    this.paginator.pageIndex = 0;
    this.updateTable()
  }

  resetFilter() {
    this.initSelectors();
    this.updateTable();
  }
}

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogOverviewDialogCity {

  cityDto: CityDto = new CityDto(null, null);
  countries: BaseDto [] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogCity>,
    private countryService: CountryService,
    private cityService: CityService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initSelectors();
  }

  initSelectors() {
    this.countryService.getAll().subscribe(result => {
      this.countries = result.map(result => new BaseDto(result.id, result.name));
      this.countries.unshift();
    });
  }

  onYesClick(): void {
    this.cityService.save(this.cityDto).subscribe(result => {
      this.dialogRef.close()
    });
  }
}
