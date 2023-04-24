import {Component, Input} from '@angular/core';
import {Voting} from "../../../../data/voting";

@Component({
  selector: 'app-view-voting-authorization',
  templateUrl: './view-voting-authorization.component.html',
  styleUrls: ['./view-voting-authorization.component.scss']
})
export class ViewVotingAuthorizationComponent {
  @Input()
  voting: Voting = new Voting();

  get isInvitationBased(): boolean {
    return this.voting.isInvitesBased;
  }
}
