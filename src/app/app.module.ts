import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {FormsModule} from "@angular/forms";
import {PostComponent} from './pages/post/post.component';
import {AuthModule} from "@auth0/auth0-angular";
import {VoteHomeComponent} from './pages/vote/vote-home/vote-home.component';
import {LetsVoteComponent} from './pages/vote/lets-vote/lets-vote.component';
import {MyVotingsComponent} from './pages/vote/my-votings/my-votings.component';
import {LoginRequiredComponent} from './components/login-required/login-required.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtBearerInterceptor} from "./interceptors/jwt-bearer-interceptor";
import {PaginationComponent} from './components/pagination/pagination.component';
import {VotingsPaginationComponent} from './components/votings-pagination/votings-pagination.component';
import {CreateVotingComponent} from './pages/vote/create-voting/create-voting.component';
import {SelectNetworkComponent} from './pages/vote/create-voting/select-network/select-network.component';
import {
  FundingAccountSourceComponent
} from './pages/vote/create-voting/funding-account-source/funding-account-source.component';
import {
  FundingAccountBalanceComponent
} from './pages/vote/create-voting/funding-account-balance/funding-account-balance.component';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {VotingTitleComponent} from './pages/vote/create-voting/voting-title/voting-title.component';
import {VotingDescriptionComponent} from './pages/vote/create-voting/voting-description/voting-description.component';
import {EditorComponent} from "@tinymce/tinymce-angular";
import {
  VotingTokenIdentifierComponent
} from './pages/vote/create-voting/voting-token-identifier/voting-token-identifier.component';
import {
  VotingStartEndDateComponent
} from './pages/vote/create-voting/voting-start-end-date/voting-start-end-date.component';
import {VotingEncryptionComponent} from './pages/vote/create-voting/voting-encryption/voting-encryption.component';
import {VotesLimitComponent} from './pages/vote/create-voting/votes-limit/votes-limit.component';
import {
  VotingVisibilityAndAuthorizationComponent
} from './pages/vote/create-voting/voting-visibility-and-authorization/voting-visibility-and-authorization.component';
import {VotingBallotTypeComponent} from './pages/vote/create-voting/voting-ballot-type/voting-ballot-type.component';
import {
  VotingAuthorizationEmailsComponent
} from './pages/vote/create-voting/voting-authorization-emails/voting-authorization-emails.component';
import {TagsInputComponent} from './components/tags-input/tags-input.component';
import {
  VotingAuthorizationModeComponent
} from './pages/vote/create-voting/voting-authorization-mode/voting-authorization-mode.component';
import {VotingQuestionsComponent} from './pages/vote/create-voting/voting-questions/voting-questions.component';
import {ToastsComponent} from './components/toasts/toasts.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ViewVotingComponent} from './pages/vote/view-voting/view-voting.component';
import {ViewVotingDatesComponent} from './pages/vote/view-voting/view-voting-dates/view-voting-dates.component';
import {CountdownTimeComponent} from './components/countdown-time/countdown-time.component';
import {
  ViewVotingNetworkDataComponent
} from './pages/vote/view-voting/view-voting-network-data/view-voting-network-data.component';
import {
  DisplayAccountComponent
} from './pages/vote/view-voting/view-voting-network-data/display-account/display-account.component';
import {
  ViewVotingEncryptionComponent
} from './pages/vote/view-voting/view-voting-encryption/view-voting-encryption.component';
import {
  ViewVotingOtherDataComponent
} from './pages/vote/view-voting/view-voting-other-data/view-voting-other-data.component';
import {
  ViewVotingAuthorizationComponent
} from './pages/vote/view-voting/view-voting-authorization/view-voting-authorization.component';
import {ViewVotingPollsComponent} from './pages/vote/view-voting/view-voting-polls/view-voting-polls.component';
import {CastVoteComponent} from './pages/vote/cast-vote/cast-vote.component';
import {CastMultiPollVoteComponent} from './pages/vote/cast-vote/cast-multi-poll-vote/cast-multi-poll-vote.component';
import {
  CastMultiChoiceVoteComponent
} from './pages/vote/cast-vote/cast-multi-choice-vote/cast-multi-choice-vote.component';
import {CastVoteProgressComponent} from "./pages/vote/cast-vote/cast-vote-progress/cast-vote-progress.component";
import {ShowResultsComponent} from './pages/vote/show-results/show-results.component';
import {NgxEchartsModule} from "ngx-echarts";
import { InviteComponent } from './pages/vote/invite/invite.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    VoteHomeComponent,
    LetsVoteComponent,
    MyVotingsComponent,
    LoginRequiredComponent,
    PaginationComponent,
    VotingsPaginationComponent,
    CreateVotingComponent,
    SelectNetworkComponent,
    FundingAccountSourceComponent,
    FundingAccountBalanceComponent,
    SpinnerComponent,
    VotingTitleComponent,
    VotingDescriptionComponent,
    VotingTokenIdentifierComponent,
    VotingStartEndDateComponent,
    VotingEncryptionComponent,
    VotesLimitComponent,
    VotingVisibilityAndAuthorizationComponent,
    VotingBallotTypeComponent,
    VotingAuthorizationEmailsComponent,
    TagsInputComponent,
    VotingAuthorizationModeComponent,
    VotingQuestionsComponent,
    ToastsComponent,
    ViewVotingComponent,
    ViewVotingDatesComponent,
    CountdownTimeComponent,
    ViewVotingNetworkDataComponent,
    DisplayAccountComponent,
    ViewVotingEncryptionComponent,
    ViewVotingOtherDataComponent,
    ViewVotingAuthorizationComponent,
    ViewVotingPollsComponent,
    CastVoteComponent,
    CastMultiPollVoteComponent,
    CastMultiChoiceVoteComponent,
    CastVoteProgressComponent,
    ShowResultsComponent,
    InviteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'galactic-pub.eu.auth0.com',
      clientId: 'givelnA5lZwd1JMfl8YL7tM8EkXBEzvb',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    EditorComponent,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts")
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtBearerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
