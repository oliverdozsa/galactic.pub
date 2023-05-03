import {Component, Input} from '@angular/core';
import {Poll, Voting} from "../../../../data/voting";
import {BallotType} from "../../../../create-voting/ballot-type";
import {CastVoteService} from "../../../../services/cast-vote.service";

@Component({
  selector: 'app-cast-multi-poll-vote',
  templateUrl: './cast-multi-poll-vote.component.html',
  styleUrls: ['./cast-multi-poll-vote.component.scss']
})
export class CastMultiPollVoteComponent {
  @Input()
  voting: Voting = new Voting();

  selectedOptions: any[] = [];

  constructor(private castVoteService: CastVoteService) {
    castVoteService.isAllowedToCastVoteChange$.next(false);
  }

  isChoiceValidFor(poll: Poll) {
    return this.selectedOptions.length > poll.index && this.selectedOptions[poll.index] != undefined;
  }

  onChoiceChange() {
    setTimeout(() => {
      this.castVoteService.selectedOptionsChange$.next(this.selectedOptions);
      this.notifyIfAllowedToCast();
    });
  }

  private notifyIfAllowedToCast() {
    const isAllValid = this.voting.polls.every(p => this.isChoiceValidFor(p));
    this.castVoteService.isAllowedToCastVoteChange$.next(isAllValid);
  }
}
