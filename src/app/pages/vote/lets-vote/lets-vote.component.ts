import { Component } from '@angular/core';
import {PagingSource} from "../../../services/votings.service";
import {AppAuthService} from "../../../services/app-auth.service";

@Component({
  selector: 'app-lets-vote',
  templateUrl: './lets-vote.component.html',
  styleUrls: ['./lets-vote.component.scss']
})
export class LetsVoteComponent {
  constructor(public appAuth: AppAuthService) {
  }

  protected readonly PagingSource = PagingSource;
}
