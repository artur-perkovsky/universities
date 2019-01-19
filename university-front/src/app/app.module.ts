import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // <-- NgModel lives here
import {MatCardModule} from '@angular/material/card';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {CreateUniversityDialog, UniversityComponent} from './components/university/university.component';
import {CityComponent, DialogOverviewDialogCity} from './components/city/city.component';
import {CountryComponent, CreateCountryDialog} from './components/country/country.component';


import {HttpClientModule} from "@angular/common/http";
import {NavigationComponent} from './components/navigation/navigation.component';
import {MatTableModule} from '@angular/material/table';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatToolbarModule
} from "@angular/material";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DeleteButtonCityComponent} from './components/delete-button/delete-button-city.component';
import {DeleteButtonUniversityComponent} from "./components/delete-button/delete-button-university.component";
import {DeleteButtonCountryComponent} from "./components/delete-button/delete-button-country.component";
import {CreateSpecialtyDialog, SpecialitiesComponent} from './components/specialities/specialities.component';
import {DeleteButtonSpecialitiesComponent} from "./components/delete-button/delete-button-specialities.component";


@NgModule({
  declarations: [
    AppComponent,
    UniversityComponent,
    CityComponent,
    CountryComponent,
    NavigationComponent,
    CreateUniversityDialog,
    DialogOverviewDialogCity,
    CreateCountryDialog,
    DeleteButtonCityComponent,
    DeleteButtonUniversityComponent,
    DeleteButtonCountryComponent,
    DeleteButtonSpecialitiesComponent,
    SpecialitiesComponent,
    CreateSpecialtyDialog
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
    MatSortModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateUniversityDialog,
    DialogOverviewDialogCity,
    CreateCountryDialog,
    DeleteButtonCityComponent,
    DeleteButtonCountryComponent,
    DeleteButtonUniversityComponent,
    DeleteButtonSpecialitiesComponent,
    CreateSpecialtyDialog
  ]
})
export class AppModule {
}
