import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {MatCardModule} from '@angular/material/card';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {DialogOverviewDialogUniversity, UniversityComponent} from './components/university/university.component';
import {CityComponent, DialogOverviewDialogCity} from './components/city/city.component';
import {CountryComponent, DialogOverviewDialogCountry} from './components/country/country.component';


import {HttpClientModule} from "@angular/common/http";
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MatTableModule} from '@angular/material/table';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {CitySelectComponent} from "./components/city-select/city-select.component";
import {AgeSelectComponent} from './components/age-select/age-select.component';
import {CountrySelectComponent} from './components/country-select/country-select.component';
import {DeleteButtonComponent} from './components/delete-button/delete-button.component';


@NgModule({
  declarations: [
    AppComponent,
    UniversityComponent,
    CityComponent,
    CountryComponent,
    DashboardComponent,
    NavigationComponent,
    DialogOverviewDialogUniversity,
    DialogOverviewDialogCity,
    DialogOverviewDialogCountry,
    CitySelectComponent,
    AgeSelectComponent,
    CountrySelectComponent,
    DeleteButtonComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewDialogUniversity,
    DialogOverviewDialogCity,
    DialogOverviewDialogCountry,
    DeleteButtonComponent
  ]
})
export class AppModule {
}
