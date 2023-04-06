import { Component } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-votings',
  templateUrl: './my-votings.component.html',
  styleUrls: ['./my-votings.component.scss']
})
export class MyVotingsComponent {


  constructor(public auth: AuthService) {
    auth.isAuthenticated$
      .subscribe()
  }
}
