import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {FormsModule} from "@angular/forms";
import { VoteComponent } from './pages/vote/vote.component';
import { PostComponent } from './pages/post/post.component';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
