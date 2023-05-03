import {Component, Input, OnInit} from '@angular/core';
import {Poll, Voting} from "../../../../data/voting";
import {CastVoteService} from "../../../../services/cast-vote.service";

@Component({
  selector: 'app-cast-multi-choice-vote',
  templateUrl: './cast-multi-choice-vote.component.html',
  styleUrls: ['./cast-multi-choice-vote.component.scss']
})
export class CastMultiChoiceVoteComponent implements OnInit {
  @Input()
  voting: Voting = new Voting();

  poll: Poll = new Poll();
  selectedOptions: any[] = [];

  get numOfSelectedChoices(): number {
    if (this.selectedOptions && this.selectedOptions.length > 0) {
      return this.selectedOptions.reduce((a, c) => c ? ++a : a, 0);
    }

    return 0;
  }

  constructor(private castVoteService: CastVoteService) {
    castVoteService.isAllowedToCastVoteChange$.next(false);
  }

  ngOnInit(): void {
    this.poll = this.voting.polls[0];
  }

  onChoiceChange() {
    setTimeout(() => {
      this.castVoteService.selectedOptionsChange$.next(this.selectedOptions);
    });
  }

  private notifyIfAllowedToCast() {
    const isAllowed = this.numOfSelectedChoices > 0 && this.numOfSelectedChoices <= this.voting.maxChoices!;
    this.castVoteService.isAllowedToCastVoteChange$.next(isAllowed);
  }
}
