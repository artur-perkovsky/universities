import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {UniversityComponent} from "./components/university/university.component";
import {CountryComponent} from "./components/country/country.component";
import {CityComponent} from "./components/city/city.component";
import { RatingComponent } from "./components/rating/rating.component";

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "universities", component: UniversityComponent},
  {path: "countries", component: CountryComponent},
  {path: "cities", component: CityComponent},
  {path: "rating", component: RatingComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
