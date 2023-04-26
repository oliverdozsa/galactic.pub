import { Component } from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";
import {PagingSource} from "../../../services/votings.service";

@Component({
  selector: 'app-lets-vote',
  templateUrl: './lets-vote.component.html',
  styleUrls: ['./lets-vote.component.scss']
})
export class LetsVoteComponent {
  constructor(public auth: AuthService) {
  }

  protected readonly PagingSource = PagingSource;
}
