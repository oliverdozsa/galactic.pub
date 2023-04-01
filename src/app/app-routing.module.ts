import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutes} from "./app-routes";
import {HomeComponent} from "./pages/home/home.component";
import {VoteComponent} from "./pages/vote/vote.component";
import {PostComponent} from "./pages/post/post.component";

const routes: Routes = [
  {path: '', redirectTo: `/${AppRoutes.HOME}`, pathMatch: 'full'},
  {path: AppRoutes.HOME, component: HomeComponent},
  {path: AppRoutes.VOTE, component: VoteComponent},
  {path: AppRoutes.POST, component: PostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
