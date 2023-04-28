import {Component, Input} from '@angular/core';
import {Poll, Voting} from "../../../../data/voting";
import {BallotType} from "../../../../create-voting/ballot-type";

@Component({
  selector: 'app-cast-multi-poll-vote',
  templateUrl: './cast-multi-poll-vote.component.html',
  styleUrls: ['./cast-multi-poll-vote.component.scss']
})
export class CastMultiPollVoteComponent {
  @Input()
  voting: Voting = new Voting();

  selectedOptions: any[] = [];

  isChoiceValidFor(poll: Poll) {
    return this.selectedOptions.length > poll.index && this.selectedOptions[poll.index] != undefined;
  }
}
