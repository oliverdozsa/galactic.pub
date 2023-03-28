import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppRoutes} from "./app-routes";
import {HomeComponent} from "./pages/home/home.component";
import {SignupComponent} from "./pages/signup/signup.component";

const routes: Routes = [
  { path: '', redirectTo: `/${AppRoutes.HOME}`, pathMatch: 'full' },
  {path: AppRoutes.HOME, component: HomeComponent},
  {path: AppRoutes.SIGNUP, component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
