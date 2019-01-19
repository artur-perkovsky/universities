import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UniversityComponent} from "./components/university/university.component";
import {CountryComponent} from "./components/country/country.component";
import {CityComponent} from "./components/city/city.component";
import {SpecialitiesComponent} from "./components/specialities/specialities.component";

const routes: Routes = [
  {path: "", component: UniversityComponent},
  {path: "universities", component: UniversityComponent},
  {path: "countries", component: CountryComponent},
  {path: "cities", component: CityComponent},
  {path: "specialities", component: SpecialitiesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
