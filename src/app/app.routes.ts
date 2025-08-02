import {Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {VotingHomeComponent} from './pages/voting/voting-home/voting-home.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {CreateVotingComponent} from './pages/voting/create-voting/create-voting.component';
import {
  VotingsWhereIParticipateComponent
} from './pages/voting/votings-listings/votings-where-iparticipate/votings-where-iparticipate.component';
import {MyCreatedVotingsComponent} from './pages/voting/votings-listings/my-created-votings/my-created-votings.component';
import {ViewVotingComponent} from './pages/voting/view-voting/view-voting.component';

export const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "voting/home", component: VotingHomeComponent},
  {path: "voting/create", component: CreateVotingComponent},
  {path: "voting/my-created-votings", component: MyCreatedVotingsComponent},
  {path: "voting/votings-where-i-participate", component: VotingsWhereIParticipateComponent},
  {path: "voting/:id", component: ViewVotingComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", component: PageNotFoundComponent},
];
