import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from "./app-routes";
import {HomeComponent} from "./pages/home/home.component";
import {PostComponent} from "./pages/post/post.component";
import {VoteHomeComponent} from "./pages/vote/vote-home/vote-home.component";
import {LetsVoteComponent} from "./pages/vote/lets-vote/lets-vote.component";
import {MyVotingsComponent} from "./pages/vote/my-votings/my-votings.component";
import {CreateVotingComponent} from "./pages/vote/create-voting/create-voting.component";
import {ViewVotingComponent} from "./pages/vote/view-voting/view-voting.component";
import {CastVoteComponent} from "./pages/vote/cast-vote/cast-vote.component";
import {ShowResultsComponent} from "./pages/vote/show-results/show-results.component";
import {InviteComponent} from "./pages/vote/invite/invite.component";

const routes: Routes = [
  {path: AppRoutes.HOME, component: HomeComponent},
  {path: AppRoutes.VOTE_HOME, component: VoteHomeComponent},
  {path: AppRoutes.LETS_VOTE, component: LetsVoteComponent},
  {path: AppRoutes.MY_VOTINGS, component: MyVotingsComponent},
  {path: AppRoutes.CREATE_VOTING, component: CreateVotingComponent},
  {path: AppRoutes.VIEW_VOTING + "/:id", component: ViewVotingComponent},
  {path: AppRoutes.CAST_VOTE + "/:id", component: CastVoteComponent},
  {path: AppRoutes.SHOW_RESULTS + "/:id", component: ShowResultsComponent},
  {path: AppRoutes.POST, component: PostComponent},
  {path: AppRoutes.VOTING_INVITE + "/:token", component: InviteComponent},
  {path: '', redirectTo: `/${AppRoutes.HOME}`, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
