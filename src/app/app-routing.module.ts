import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from "./app-routes";
import {HomeComponent} from "./pages/home/home.component";
import {PostComponent} from "./pages/post/post.component";
import {VoteHomeComponent} from "./pages/vote/vote-home/vote-home.component";
import {LetsVoteComponent} from "./pages/vote/lets-vote/lets-vote.component";
import {MyVotingsComponent} from "./pages/vote/my-votings/my-votings.component";
import {CreateVotingComponent} from "./pages/vote/create-voting/create-voting.component";

const routes: Routes = [
  {path: '', redirectTo: `/${AppRoutes.HOME}`, pathMatch: 'full'},
  {path: AppRoutes.HOME, component: HomeComponent},
  {path: AppRoutes.VOTE_HOME, component: VoteHomeComponent},
  {path: AppRoutes.LETS_VOTE, component: LetsVoteComponent},
  {path: AppRoutes.MY_VOTINGS, component: MyVotingsComponent},
  {path: AppRoutes.CREATE_VOTING, component: CreateVotingComponent},
  {path: AppRoutes.POST, component: PostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
