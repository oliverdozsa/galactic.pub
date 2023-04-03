import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';
import {FormsModule} from "@angular/forms";
import {VoteComponent} from './pages/vote/vote.component';
import {PostComponent} from './pages/post/post.component';
import {AuthModule} from "@auth0/auth0-angular";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent,
    PostComponent
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
