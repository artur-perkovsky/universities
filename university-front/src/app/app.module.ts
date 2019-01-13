import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogOverviewExampleDialog, UniversityComponent } from './components/university/university.component';
import { DialogOverviewExampleDialogDell } from './components/university/university.component';

import { HttpClientModule } from "@angular/common/http";
import { CityComponent } from './components/city/city.component';
import { CountryComponent } from './components/country/country.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatTableModule } from '@angular/material/table';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule, MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSelectModule
} from "@angular/material";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CitySelectComponent } from "./components/city-select/city-select.component";
import { AgeSelectComponent } from './components/age-select/age-select.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';


@NgModule({
  declarations: [
    AppComponent,
    UniversityComponent,
    CityComponent,
    CountryComponent,
    DashboardComponent,
    NavigationComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialogDell,
    CitySelectComponent,
    AgeSelectComponent,
    CountrySelectComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialogDell
  ]
})
export class AppModule {
}
