import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {FormsModule} from "@angular/forms";
import {PostComponent} from './pages/post/post.component';
import {AuthModule} from "@auth0/auth0-angular";
import { VoteHomeComponent } from './pages/vote/vote-home/vote-home.component';
import { LetsVoteComponent } from './pages/vote/lets-vote/lets-vote.component';
import { MyVotingsComponent } from './pages/vote/my-votings/my-votings.component';
import { LoginRequiredComponent } from './components/login-required/login-required.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    VoteHomeComponent,
    LetsVoteComponent,
    MyVotingsComponent,
    LoginRequiredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'galactic-pub.eu.auth0.com',
      clientId: 'givelnA5lZwd1JMfl8YL7tM8EkXBEzvb',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
