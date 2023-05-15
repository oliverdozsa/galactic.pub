import { Component } from '@angular/core';
import {PagingSource} from "../../../services/votings.service";
import {CheckAuthService} from "../../../services/check-auth.service";

@Component({
  selector: 'app-lets-vote',
  templateUrl: './lets-vote.component.html',
  styleUrls: ['./lets-vote.component.scss']
})
export class LetsVoteComponent {
  constructor(public checkAuth: CheckAuthService) {
  }

  protected readonly PagingSource = PagingSource;
}
