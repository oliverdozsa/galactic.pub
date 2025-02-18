import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {VotingHomeComponent} from './pages/voting/voting-home/voting-home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "voting/home", component: VotingHomeComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent},
];
