import { Component } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
  selector: 'app-my-votings',
  templateUrl: './my-votings.component.html',
  styleUrls: ['./my-votings.component.scss']
})
export class MyVotingsComponent {
  constructor(public auth: AuthService) {
  }
}
