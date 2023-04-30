import {Component, Input, OnInit} from '@angular/core';
import {Poll, Voting} from "../../../../data/voting";

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

  ngOnInit(): void {
    this.poll = this.voting.polls[0];
  }
}
